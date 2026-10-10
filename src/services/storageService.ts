import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import config from "../../firebase-applet-config.json";

export class StorageService {
  /**
   * Uploads a file to Firebase Storage or Cloudflare R2
   * @param file The file to upload
   * @param path The path in storage (e.g. 'menuItems')
   * @param onProgress Optional callback for upload progress
   * @returns The public URL of the uploaded file
   */
  static async uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: number) => void,
  ): Promise<string> {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
      const fullPath = `${path}/${fileName}`;

      console.log(
        `Starting upload to ${fullPath} (Size: ${file.size} bytes)...`,
      );
      if (onProgress) onProgress(10); // Initial progress

      // Try direct Firebase Storage upload first
      try {
        console.log(`Attempting direct Firebase Storage upload: ${fullPath}`);
        const storageRef = ref(storage, fullPath);
        const uploadTask = uploadBytes(storageRef, file).then((snapshot) => getDownloadURL(snapshot.ref));
        const timeoutTask = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Direct Firebase upload timeout")), 6000)
        );
        const firebaseDownloadUrl = await Promise.race([uploadTask, timeoutTask]);
        if (onProgress) onProgress(100);
        console.log(`Direct Firebase Storage upload successful: ${firebaseDownloadUrl}`);
        return firebaseDownloadUrl;
      } catch (fbErr) {
        console.warn("Direct Firebase upload bypassed/failed, trying backend proxy:", fbErr);
      }

      const settingsRef = doc(db, "settings", "global");
      const settingsDoc = await getDoc(settingsRef);
      let r2Config = null;

      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        if (
          data.cloudflareR2AccountId &&
          data.cloudflareR2AccessKeyId &&
          data.cloudflareR2SecretAccessKey &&
          data.cloudflareR2BucketName
        ) {
          r2Config = data;
        }
      }

      if (r2Config) {
        // Use Pre-signed URL for Cloudflare R2
        console.log(`Getting presigned URL for Cloudflare R2: ${fullPath}`);
        if (onProgress) onProgress(30);

        const presignReqHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          "x-r2-account-id": r2Config.cloudflareR2AccountId,
          "x-r2-access-key-id": r2Config.cloudflareR2AccessKeyId,
          "x-r2-secret-access-key": r2Config.cloudflareR2SecretAccessKey,
          "x-r2-bucket-name": r2Config.cloudflareR2BucketName,
        };
        if (r2Config.cloudflareR2PublicDomain) {
          presignReqHeaders["x-r2-public-domain"] = r2Config.cloudflareR2PublicDomain;
        }

        const presignRes = await fetch("/api/storage/presign", {
          method: "POST",
          headers: presignReqHeaders,
          body: JSON.stringify({
            path: fullPath,
            contentType: file.type || "application/octet-stream"
          }),
        });

        if (!presignRes.ok) {
          throw new Error("Failed to get presigned URL from backend.");
        }
        
        const presignData = await presignRes.json();
        if (!presignData.success) {
          throw new Error(presignData.error || "Failed to generate R2 upload URL.");
        }

        if (onProgress) onProgress(60);

        // Upload directly to Cloudflare R2 using the presigned URL
        const uploadRes = await fetch(presignData.presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        });

        if (!uploadRes.ok) {
          throw new Error(`Failed to upload file to R2: ${await uploadRes.text()}`);
        }

        if (onProgress) onProgress(100);
        console.log(`Upload successful via Presigned URL... ${presignData.url}`);
        return presignData.url;
      }

      // Fallback to Firebase Storage Proxy
      console.log(`Using Firebase Storage proxy: ${fullPath}`);
      if (onProgress) onProgress(30);

      const bucket =
        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || config.storageBucket;
      const url = `/api/storage/upload?bucket=${bucket}&path=${encodeURIComponent(fullPath)}`;

      const headers: Record<string, string> = {
        "Content-Type": file.type || "application/octet-stream",
      };

      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        headers["Authorization"] = `Bearer ${token}`; 
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: file, 
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Backend Upload Proxy error:", errorData);
        let errorMsg = `Upload failed: ${errorData}`;
        try {
          const parsed = JSON.parse(errorData);
          if (parsed.error) errorMsg = parsed.error;
        } catch(e) { }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Upload failed");
      }

      if (onProgress) onProgress(100);

      console.log(`Upload successful via Proxy... ${data.url}`);
      return data.url;
    } catch (error: any) {
      console.error("Firebase Storage Upload error detail:", error);
      throw error;
    }
  }

  /**
   * Deletes a file from Firebase Storage
   */
  static async deleteFile(fileUrl: string): Promise<void> {
    try {
      if (
        fileUrl.includes("firebasestorage.googleapis.com") ||
        fileUrl.includes("firebasestorage.app")
      ) {
        const decodedUrl = decodeURIComponent(fileUrl);
        const pathStartIndex = decodedUrl.indexOf("/o/") + 3;
        const pathEndIndex = decodedUrl.indexOf("?alt=media");

        if (pathStartIndex > 2 && pathEndIndex > -1) {
          const filePath = decodedUrl.substring(pathStartIndex, pathEndIndex);
          const storageRef = ref(storage, filePath);
          await deleteObject(storageRef);
        }
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }
}
