import axios from "axios";

export default async function courierAccessToken() {
  const PathaoCourierData = await PathaoModel.find({});

  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/issue-token`;

  const requestData = {
    client_id: PathaoCourierData.clientId || process.env.COURIER_CLIENT_ID,
    client_secret:
      PathaoCourierData.clientSecret || process.env.COURIER_CLIENT_SECRET,
    username: PathaoCourierData.clientEmail || process.env.COURIER_EMAIL,
    password: PathaoCourierData.clientPassword || process.env.COURIER_PASSWORD,
    grant_type: "password",
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Access Token Response:", response.data);

    if (response.data.access_token) {
      requestData.refresh_token = response.data.refresh_token;
      requestData.grant_type = "refresh_token";
      const response2 = await axios.post(url, requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response2.data.access_token) {
        console.log("refreshed access token:", response2.data);
        return response2.data;
      }
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}
