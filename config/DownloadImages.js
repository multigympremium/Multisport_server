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
      case "all":
        const allFiles = await getAllFiles();
        // zipResult = await downloadAndZipImages(allFiles);
        zipResult = await downloadImages(allFiles);
        console.log(zipResult, "zipResult");

        res.json(zipResult);
        // res.json(allFiles);
        break;
      case "product":
        // const productFiles = await getFilesFromFolder(
        //   `/multi-sports/${folderName}`
        // );
        const productFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );

        console.log(productFiles, "productFiles");
        if (productFiles?.length > 0) {
          //   zipResult = await downloadImages(productFiles);
          //   console.log(zipResult, "zipResult");
          //   res.send(zipResult);
          res.data = productFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }

        break;
      case "about-mission":
        const missionFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (missionFiles?.length > 0) {
          // zipResult = await downloadImages(missionFiles);
          //   console.log(zipResult, "zipResult");
          //   res.send(zipResult);
          res.data = missionFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "about-us":
        const aboutUsFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        // zipResult = await downloadAndZipImages(aboutUsFiles);
        if (aboutUsFiles?.length > 0) {
          res.data = aboutUsFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "about-vision":
        const visionFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        if (visionFiles?.length > 0) {
          res.data = visionFiles;
          await sendFileAsZip(res);
        } else {
          res.status(404).json({ success: false, message: "No files found" });
        }
        break;
      case "brand":
        const brandFiles = await getFilesFromFolder(
          `multi-sports/${folderName}`
        );
        console.log(brandFiles, "brandFiles");
        if (brandFiles?.length > 0) {
          res.data = brandFiles;
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
