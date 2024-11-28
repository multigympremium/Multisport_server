import axios from "axios";

export const courierStoreCreate = async (data) => {
  const url = `${process.env.COURIER_URL}/aladdin/api/v1/stores`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  console.log(data.accessToken, "data adfdf")


  const requestData = {
    "name": "Enamul",
    "contact_name": "Enamul",
    "contact_number": "01761515810",
    "secondary_contact": "01961394375",
    "address": "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
    "city_id": 1,
    "zone_id": 1,
    "area_id": 1,
}
  

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    console.log(response.data, "response.data store")

    return response.data;
  } catch (error) {
    console.error('Error creating store:', error.response?.data || error.message);
    return error.message
  }
};