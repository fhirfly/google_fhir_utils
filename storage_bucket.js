// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client using Application Default Credentials
const storage = new Storage();
// Creates a client from a Google service account key
const storage = new Storage({keyFilename: './keys/fhirfly-c3e02272b3a3.json'});

module.exports.createBucket = async(bucketName) =>{
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
  return bucketName;
}

module.exports.uploadBucket = async(bucketName, Path) =>{
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
  return bucketName;
}