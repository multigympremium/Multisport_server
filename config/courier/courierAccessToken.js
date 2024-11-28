import axios from "axios";

export default async function courierAccessToken() {
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/issue-token`;

  const requestData = {
    client_id: process.env.COURIER_CLIENT_ID,
    client_secret: process.env.COURIER_CLIENT_SECRET,
    username: process.env.COURIER_EMAIL,
    password: process.env.COURIER_PASSWORD,
    grant_type: "password",
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // console.log("Access Token Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    return null;
  }
}
