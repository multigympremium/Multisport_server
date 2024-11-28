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
export async function courierArea(req, res) {
  const id = req.params.id;
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/zones/${id}/area-list`;

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


export async function courierStoreGet(req, res) {
  const id = req.params.id;
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/stores`;

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


export const courierStoreCreate = async (req, res) => {
  const requestData = req.body;
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/stores`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  const accessToken = await courierAccessToken();


//   const requestData = {
//     "name": "Enamul",
//     "contact_name": "Enamul",
//     "contact_number": "01761515810",
//     "secondary_contact": "01961394375",
//     "address": "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
//     "city_id": 1,
//     "zone_id": 1,
//     "area_id": 1,
// }

console.log(requestData, "requestData")
  

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    console.log(response.data, "response.data store")

    res.status(200).json({
      message: "Store created successfully",
      store: response.data,
    });
  } catch (error) {
    console.error('Error creating store:', error.response?.data || error.message);
    res.status(500).json({
      message: "Error creating store",
      error: error.response?.data || error.message,
    });
  }
};
