import axios from "axios";
import courierAccessToken from "../../../config/courier/courierAccessToken.js";

export async function courierCities(req, res) {
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/city-list`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url,  {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis")

    

     res.status(200).send({success: true, data: response?.data})


  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    return null;
  }
}
export async function courierZones(req, res) {
  const id = req.params.id;
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/cities/${id}/zone-list`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url,  {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis")

    

     res.status(200).send({success: true, data: response?.data})


  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    return null;
  }
}
