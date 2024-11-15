  import {
    S3Client,
    GetObjectCommand,
    DeleteObjectCommand,
    PutObjectCommand,
  } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import { Upload } from "@aws-sdk/lib-storage";

  // Create an S3 client instance
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    // endpoint: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    // endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
    // endpoint: `https://${process.env.AWS_S3_BUCKET_NAME}.${process.env.AWS_REGION}.digitaloceanspaces.com`,
    // endpoint: `https://mgpwebaps.s3.eu-north-1.amazonaws.com`,
    // forcePathStyle: true,
    // s3ForcePathStyle: true

  });

  export const uploadFile = async (file, fileName, mimeType) => {

    console.log(process.env.AWS_REGION, process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
    
    
    // const fileToUint8Array = new Uint8Array(await (file as Blob).arrayBuffer())
//     const array = fileToUint8Array(file);
// console.log(array); 
    console.log(file, "file in uploadFile");
    // const fileBuffer = file && Buffer.from(await file?.arrayBuffer());
    // console.log(fileBuffer, "fileBuffer in uploadFile");
    // const upload = new Upload({
    //   client: s3Client,
    //   params: {
    //     Bucket: process.env.AWS_S3_BUCKET_NAME,
    //     Key: `multi-sports/${fileName}`,
    //     Body: file.data,
    //     // Body: file,
    //     forcePathStyle: false,
    //     ContentType: mimeType ? mimeType : "image",
    //   },
    // });

    // //   const command = new PutObjectCommand(params);
    // const result = await upload.done();
    // return result;



    const client = new S3Client({
      // endpoint: "https://sgp1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
      forcePathStyle: false,
      region: process.env.AWS_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // The path to the directory you want to upload the object to, starting with your Space name.
      Key: `multi-sports/${fileName}`, // Object key, referenced whenever you want to access this file later.
      Body: file.data, // The object's contents. This variable is an object, not a string.
      // ACL: "public-read", // Defines ACL permissions, such as private or public.
      // Metadata: {
      //   // Defines metadata tags.
      //   // "x-amz-meta-my-key": "your-value"
      // },
      ContentType: mimeType ? mimeType : "image",
    };
  
    try {
      const data = await client.send(new PutObjectCommand(uploadParams));
      console.log(
        "Successfully uploaded object: " +
          uploadParams.Bucket +
          "/" +
          uploadParams.Key
      );
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };

  export const getFile = async (key) => {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    // Generate a signed URL for accessing the file
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
  };

  export const deleteFile = async (key) => {

    const client = new S3Client({
      // endpoint: "https://sgp1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
      forcePathStyle: false,
      region: process.env.AWS_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `multi-sports/${key}`,
    };

    const command = new DeleteObjectCommand(params);
    return await client.send(command);
  };
  
