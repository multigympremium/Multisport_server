import express from "express";
import { getAllFiles, getFilesFromFolder } from "../app/helpers/aws-s3.js";
import downloadAndZipImages from "../app/helpers/downloadAndZipImages.js";
import downloadImages from "../app/helpers/downloadImage.js";
import sendFileAsZip from "../app/helpers/sendFileAsZip.js";
const BackupRoutes = express.Router();

BackupRoutes.get("/images/:folderName", async (req, res) => {
  const folderName = req.params.folderName; // Pass the folder name as a query parameter

  if (!folderName) {
    return res.status(400).send("Folder name is required");
  }
  let zipResult;
  let filepath;
  try {
    switch (folderName) {
      case "user":
        const userFile = await getFilesFromFolder(`multi-sports/${folderName}`);
        console.log(userFile, "userFile");
        if (userFile?.length > 0) {
          res.data = userFile;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "product":
        const productFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );

        console.log(productFiles, "productFiles");
        if (productFiles?.length > 0) {
          res.data = productFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }

        break;
      case "blog":
        const missionFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (missionFiles?.length > 0) {
          res.data = missionFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "other-image":
        const aboutUsFiles = await getFilesFromFolder(
          `multi-sports/other-image`
        );
        if (aboutUsFiles?.length > 0) {
          res.data = aboutUsFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "banner":
        const visionFiles = await getFilesFromFolder(`multi-sports/banner`);
        if (visionFiles?.length > 0) {
          res.data = visionFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "category":
        const categoryFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (categoryFiles?.length > 0) {
          res.data = categoryFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "subcategory":
        const subcategoryFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (subcategoryFiles?.length > 0) {
          res.data = subcategoryFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(500).send("Error fetching folder files");
  }
});

export default BackupRoutes;
