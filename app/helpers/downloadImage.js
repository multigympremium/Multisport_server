import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

// Create the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImages = async (files) => {
  const folderPath = path.join(__dirname + "/../../", "download");

  // Ensure the 'images' directory exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  for (const file of files) {
    try {
      // Fetch the file from the URL
      const response = await axios({
        url: file.url,
        method: "GET",
        responseType: "arraybuffer", // Get the file as a buffer
      });

      // Construct the file path
      const filePath = path.join(folderPath, file.key);

      // Save the file locally
      fs.writeFileSync(filePath, response.data);
      console.log(`Downloaded: ${filePath}`);
      return response.data;
    } catch (err) {
      console.error(`Error downloading ${file.url}:`, err);
    }
  }
};

export default downloadImages;
