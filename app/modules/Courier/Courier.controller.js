import axios from "axios";
import courierAccessToken from "../../../config/courier/courierAccessToken.js";
import generateInvoiceId from "../../helpers/generateInvoiceId.js";

export const pathaoCourierOrderCreate = async (data) => {
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/orders`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  const accessToken = await courierAccessToken();

  //   {
  //     "store_id": 239581,
  //     "merchant_order_id": "asfdads",
  //     "recipient_name": "Anamul",
  //     "recipient_phone": "01987654321",
  //     "recipient_secondary_phone": "01987654323",
  //     "recipient_address": "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
  //     "recipient_city": 32,
  //     "recipient_zone": 547,
  //     "recipient_area": 7846,
  //     "delivery_type": 48,
  //     "is_point_delivery": false,
  //     "item_type": 2,
  //     "special_instruction": "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
  //     "item_quantity": 1,
  //     "item_weight": "0.5",
  //     "item_description": "asdasd",
  //     "amount_to_collect": "456",
  //     "suggested_address": {
  //         "hub_id": 47,
  //         "hub_name": "B.Baria",
  //         "area_id": 7846,
  //         "area_name": "DAKSHIN MORAIL",
  //         "zone_id": 547,
  //         "zone_name": "Brahamanbaria Sadar",
  //         "is_implicit": true,
  //         "district_id": 32,
  //         "district_name": "B. Baria",
  //         "score": 6.817621418169451,
  //         "debug_info": null
  //     }
  // }

  const headers = {
    Authorization: `Bearer ${accessToken.access_token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  console.log(headers, "headers");

  let submitData;

  if (data.itemCount > 1) {
    submitData = {
      // orders: data.items.map((item) => ({
      //   store_id: item.store_id,
      //   merchant_order_id: generateInvoiceId(),
      //   recipient_name: data.name,
      //   recipient_phone: data.phone,
      //   recipient_secondary_phone: data.secondary_phone,
      //   recipient_address: data.address,
      //   recipient_city: Number(data.city_id),
      //   recipient_zone: Number(data.zone_id),
      //   recipient_area: Number(data.area_id),
      //   delivery_type: 48,
      //   is_point_delivery: false,
      //   item_type: 2,
      //   special_instruction: data.special_instruction,
      //   item_quantity: Number(item.quantity),
      //   item_weight: item.weight,
      //   item_description: item.shortDescription,
      //   amount_to_collect: `${data.total}`,
      // })),
      orders: data.items.map((item) => ({
        store_id: 239581,
        merchant_order_id: "asfdads",
        recipient_name: "Anamul",
        recipient_phone: "01987654321",
        recipient_secondary_phone: "01987654323",
        recipient_address: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
        recipient_city: 32,
        recipient_zone: 547,
        recipient_area: 7846,
        delivery_type: 48,
        // is_point_delivery: false,
        item_type: 2,
        special_instruction: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
        item_quantity: 1,
        item_weight: "0.5",
        item_description: "asdasd",
        amount_to_collect: "456",
        suggested_address: {
          hub_id: 47,
          hub_name: "B.Baria",
          area_id: 7846,
          area_name: "DAKSHIN MORAIL",
          zone_id: 547,
          zone_name: "Brahamanbaria Sadar",
          is_implicit: true,
          district_id: 32,
          district_name: "B. Baria",
          score: 6.817621418169451,
          debug_info: null,
        },
      })),
    };
  } else {
    // submitData = {
    //   store_id: data.items[0].store_id,
    //   merchant_order_id: generateInvoiceId(),
    //   recipient_name: data.name,
    //   recipient_phone: data.phone,
    //   recipient_secondary_phone: data.secondary_phone,
    //   recipient_address: data.address,
    //   recipient_city: Number(data.city_id),
    //   recipient_zone: Number(data.zone_id),
    //   recipient_area: Number(data.area_id),
    //   delivery_type: 48,
    //   is_point_delivery: false,
    //   item_type: 2,
    //   special_instruction: data.special_instruction,
    //   item_quantity: Number(data.items[0].quantity),
    //   item_weight: "0.5",
    //   item_description: data.items[0].shortDescription,
    //   amount_to_collect: `${data.total}`,
    // };
    submitData = {
      store_id: 239581,
      merchant_order_id: "asfdads",
      recipient_name: "Anamul",
      recipient_phone: "01987654321",
      recipient_secondary_phone: "01987654323",
      recipient_address: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
      recipient_city: 32,
      recipient_zone: 547,
      recipient_area: 7846,
      delivery_type: 48,
      // is_point_delivery: false,
      item_type: 2,
      special_instruction: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
      item_quantity: 1,
      item_weight: "0.5",
      item_description: "asdasd",
      amount_to_collect: "456",
      suggested_address: {
        hub_id: 47,
        hub_name: "B.Baria",
        area_id: 7846,
        area_name: "DAKSHIN MORAIL",
        zone_id: 547,
        zone_name: "Brahamanbaria Sadar",
        is_implicit: true,
        district_id: 32,
        district_name: "B. Baria",
        score: 6.817621418169451,
        debug_info: null,
      },
    };

    const requestData = {
      store_id: data.store_id,
      merchant_order_id: generateInvoiceId(),
      recipient_name: data.name,
      recipient_phone: data.contact_number,
      recipient_secondary_phone: data.secondary_contact,
      recipient_address: data.address,
      recipient_city: data.city_id,
      recipient_zone: data.zone_id,
      recipient_area: data.area_id,
      delivery_type: 48,
      is_point_delivery: false,
      item_type: 2,
      special_instruction: data.special_instruction,
      item_quantity: data.total,
      item_weight: "0.5",
      item_description: data.item_description,
      amount_to_collect: data.total,
    };

    console.log(submitData, "pathaoCourierOrderCreate", url);

    try {
      const response = await axios.post(url, submitData, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  }
};

export async function courierCities(req, res) {
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/city-list`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis");

    res.status(200).send({ success: true, data: response?.data });
  } catch (error) {
    // console.error(
    //   "Error fetching access token:",
    //   error.response?.data || error.message
    // );
    return null;
  }
}
export async function courierZones(req, res) {
  const id = req.params.id;
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/cities/${id}/zone-list`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis");

    res.status(200).send({ success: true, data: response?.data });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    return null;
  }
}
export async function courierArea(req, res) {
  const id = req.params.id;
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/zones/${id}/area-list`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis");

    res.status(200).send({ success: true, data: response?.data });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function courierStoreGet(req, res) {
  const id = req.params.id;
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/stores`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis");

    res.status(200).send({ success: true, data: response?.data });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    return null;
  }
}

export const courierStoreCreate = async (req, res) => {
  const requestData = req.body;
  const url = `${process.env.PATHAO_COURIER_URL}/aladdin/api/v1/stores`; // Replace with actual base URL
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

  console.log(requestData, "requestData");

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response.data, "response.data store");

    res.status(200).json({
      message: "Store created successfully",
      store: response.data,
    });
  } catch (error) {
    console.error(
      "Error creating store:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Error creating store",
      error: error.response?.data || error.message,
    });
  }
};

export const courierSteadFastOrderCreate = async (requestData) => {
  // const requestData = req.body;
  const url = `${process.env.STEAD_FAST_COURIER_URL}/create_order`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  const headers = {
    "Content-Type": "application/json",
    "Api-Key": process.env.STEAD_FAST_COURIER_API_KEY,
    "Secret-Key": process.env.STEAD_FAST_COURIER_SECRET_KEY,
  };

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

  let submitData;

  if (requestData.itemCount > 1) {
    submitData = {
      data: requestData.items.map((item) => ({
        invoice: generateInvoiceId(),
        recipient_name: requestData.name,
        recipient_phone: requestData.phone,
        secondary_contact: requestData.secondary_contact,
        recipient_address: requestData.address,
        cod_amount: requestData.total,
        note: requestData.special_instruction,
      })),
    };
  } else {
    submitData = {
      invoice: generateInvoiceId(),
      recipient_name: requestData.name,
      recipient_phone: requestData.phone,
      secondary_contact: "01961394375",
      recipient_address: requestData.address,
      cod_amount: requestData.total,
      note: requestData.special_instruction,
    };
  }

  console.log(submitData, "requestData");

  try {
    const response = await axios.post(url, submitData, {
      headers: headers,
    });

    console.log(response.data, "response.data store");

    return response.data;

    // res.status(200).json({
    //   message: "SteadFast Order created successfully",
    //   store: response.data,
    // });
  } catch (error) {
    console.error(
      "Error creating SteadFast Order:",
      error.response?.data || error.message
    );
    return null;
    // res.status(500).json({
    //   message: "Error creating SteadFast Order",
    //   error: error.response?.data || error.message,
    // });
  }
};

export const createCourierOrder = async (req, res, next) => {
  const data = req.body;

  try {
    let response;

    if (data?.courierMethod === "Pathao") {
      response = await pathaoCourierOrderCreate(data);
    } else if (data?.courierMethod === "SteadFast") {
      response = await courierSteadFastOrderCreate(data);
    }

    console.log(response, "response");

    if (!response) {
      next(new Error("Courier not Successful"));
    }

    req.courierResponse = response;
    next();
  } catch (error) {
    next(error);
  }
};
