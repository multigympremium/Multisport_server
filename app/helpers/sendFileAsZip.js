import archiver from "archiver";
import axios from "axios";

export default async function sendFileAsZip(res) {
  const data = res.data;
  console.log(data, "data");
  try {
    const archive = archiver("zip", { zlib: { level: 9 } }); // Create a zip archive with max compression

    // Handle the 'close' event when the archive is finished
    // output.on("close", () => {
    //   console.log(
    //     `Archive created: ${zipPath} (${archive.pointer()} total bytes)`
    //   );
    // });

    // Handle errors in archiver
    archive.on("error", (err) => {
      throw err;
    });

    // Pipe the archive to the output (zip file)
    archive.pipe(res);

    for (const file of data) {
      try {
        // Fetch the file from the URL
        const response = await axios({
          url: file.url,
          method: "GET",
          responseType: "arraybuffer", // Get the file as a buffer
        });

        // Append the file to the archive with a specific name
        archive.append(response.data, { name: file.key });
      } catch (err) {
        console.error(`Error downloading ${file.url}:`, err);
      }
    }

    // Finalize the archive (flush all files into the zip)
    archive.finalize();
  } catch (error) {
    console.log(error, "error");
  }
}
