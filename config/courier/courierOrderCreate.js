import axios from "axios";

export const courierOrderCreate = async (data) => {
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/orders`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  console.log(data.accessToken, "data adfdf");

  const requestData = {
    store_id: 147940,
    // "merchant_order_id": "",
    recipient_name: "Enamul",
    recipient_phone: "01761515810",
    recipient_secondary_phone: "01961394375",
    recipient_address: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
    recipient_city: 1,
    recipient_zone: 1,
    recipient_area: 1,
    delivery_type: 48,
    is_point_delivery: false,
    item_type: 2,
    special_instruction: "dsafasd",
    item_quantity: 1,
    item_weight: "0.5",
    item_description: "afsdfd asdf asdfas asdf ",
    amount_to_collect: "432",
    suggested_address: {
      hub_id: null,
      hub_name: null,
      area_id: null,
      area_name: null,
      zone_id: null,
      zone_name: null,
      is_implicit: true,
      district_id: null,
      district_name: null,
      score: null,
      debug_info: null,
    },
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    return error.message;
  }
};
