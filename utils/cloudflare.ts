import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, // Substitua pelo seu ID de conta
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  region: "auto",
  signatureVersion: "v4",
});

export default s3;
