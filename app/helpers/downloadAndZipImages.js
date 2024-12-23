import fs from "fs";
import archiver from "archiver";
import axios from "axios";

const downloadAndZipImages = async (files) => {
  const zipPath = "./images" + Date.now() + ".zip"; // Path where the zip will be saved
  const output = fs.createWriteStream(zipPath); // Create a writable stream to the zip file
  const archive = archiver("zip", { zlib: { level: 9 } }); // Create a zip archive with max compression

  // Handle the 'close' event when the archive is finished
  output.on("close", () => {
    console.log(
      `Archive created: ${zipPath} (${archive.pointer()} total bytes)`
    );
  });

  // Handle errors in archiver
  archive.on("error", (err) => {
    throw err;
  });

  // Pipe the archive to the output (zip file)
  archive.pipe(output);

  // Loop through the files and append them to the zip
  for (const file of files) {
    try {
      // Fetch the file from the URL
      const response = await axios({
        url: file.url,
        method: "GET",
        responseType: "arraybuffer", // Get the file as a buffer
      });

      // Append the file to the archive with a specific name
      archive.append(response.data, { name: file.key });
      return archive;
    } catch (err) {
      console.error(`Error downloading ${file.url}:`, err);
      await archive.finalize();
      return null;
    }
  }

  await archive.finalize();
  // Finalize the zip and write the archive
};

export default downloadAndZipImages;
