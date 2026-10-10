/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import config from '../../firebase-applet-config.json';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (process.env as any || {});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || config.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || config.authDomain,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL || (config as any).databaseURL,
  projectId: env.VITE_FIREBASE_PROJECT_ID || config.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || config.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || config.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || config.appId
};

const app = initializeApp(firebaseConfig);

// Use a more robust initialization pattern for Firestore
// We use experimentalForceLongPolling to bypass WebSocket issues in the IDE's preview iframe
let databaseId = env.VITE_FIREBASE_DATABASE_ID || config.firestoreDatabaseId || '(default)';
if (databaseId && (databaseId.startsWith('http') || databaseId.includes('/'))) {
  databaseId = config.firestoreDatabaseId || '(default)';
}

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, databaseId);

export const auth = getAuth(app);

// For Storage, prioritize the config bucket but ensure it's normalized
const bucketUrl = env.VITE_FIREBASE_STORAGE_BUCKET || config.storageBucket;
const normalizedBucket = bucketUrl ? (bucketUrl.startsWith('gs://') ? bucketUrl : `gs://${bucketUrl}`) : undefined;

export const storage = getStorage(app, normalizedBucket);

// Connection test helper
import { doc, getDocFromServer } from 'firebase/firestore';

async function testConnection() {
  try {
    // Try to reach the server once on startup to ensure we are "online"
    const connRef = doc(db, '_connection_test_', 'ping');
    await getDocFromServer(connRef);
    console.log('Firestore: Connection test completed');
  } catch (error: any) {
    // Ignore permissions errors, they mean we ARE online but just can't read the test doc
    if (error.code === 'permission-denied') {
      console.log('Firestore: Connection test successful (permission denied is fine)');
    } else {
      console.warn('Firestore: Initial connection test failed', error);
    }
  }
}

testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

