import dotenv from 'dotenv';
import { S3 } from 'aws-sdk';
import { randomBytes } from 'crypto';

dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.BC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BC_AWS_SECRET_ACCESS_KEY,
  region: process.env.BC_AWS_REGION,
});

export const uploadImage = async (image: Buffer, type = 'image/png') => {
  const key = randomBytes(16).toString('hex');
  const params = {
    Bucket: process.env.BC_AWS_BUCKET_NAME || 'bytechef',
    Key: key,
    Body: image,
    ContentType: type,
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};

export const deleteImage = async (key: string) => {
  const params = {
    Bucket: process.env.BC_AWS_BUCKET_NAME || 'bytechef',
    Key: key,
  };

  await s3.deleteObject(params).promise();
};
