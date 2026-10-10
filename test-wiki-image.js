import https from 'https';

function checkUrl(url) {
  return new Promise(resolve => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve('Error: ' + e.message));
  });
}

async function run() {
  console.log(await checkUrl("https://upload.wikimedia.org/wikipedia/commons/e/ec/Rava_Dosa.jpg"));
}
run();
