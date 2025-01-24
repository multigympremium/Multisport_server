import express from "express";
import { getAllFiles, getFilesFromFolder } from "../app/helpers/aws-s3.js";
import sendFileAsZip from "../app/helpers/sendFileAsZip.js";
const BackupRoutes = express.Router();

BackupRoutes.get("/images/:folderName", async (req, res) => {
  const folderName = req.params.folderName; // Pass the folder name as a query parameter

  if (!folderName) {
    return res.status(400).send("Folder name is required");
  }

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
      case "flag":
        const flagFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (flagFiles?.length > 0) {
          res.data = flagFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "blog":
        const blogFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (blogFiles?.length > 0) {
          res.data = blogFiles;
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
        console.log(visionFiles, "banner");
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
        console.log(categoryFiles, "categoryFiles");
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
