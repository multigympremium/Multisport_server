import axios from "axios";
import courierAccessToken from "../../../config/courier/courierAccessToken.js";
import generateInvoiceId from "../../helpers/generateInvoiceId.js";
import PathaoModel from "./models/Pathao.model.js";
import SteadFastModel from "./models/SteadFast.model.js";

// export const pathaoCourierOrderCreate = async (data) => {
//   const PathaoCourierData = await PathaoModel.find({});
//   const url = `${
//     PathaoCourierData[0]?.baseUrl || process.env.PATHAO_COURIER_URL
//   }/aladdin/api/v1/orders`; // Replace with actual base URL
//   // const accessToken = '<access_token>'; // Replace with your access token

//   const accessToken = await courierAccessToken();

//   //   {
//   //     "store_id": 239581,
//   //     "merchant_order_id": "asfdads",
//   //     "recipient_name": "Anamul",
//   //     "recipient_phone": "01987654321",
//   //     "recipient_secondary_phone": "01987654323",
//   //     "recipient_address": "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
//   //     "recipient_city": 32,
//   //     "recipient_zone": 547,
//   //     "recipient_area": 7846,
//   //     "delivery_type": 48,
//   //     "is_point_delivery": false,
//   //     "item_type": 2,
//   //     "special_instruction": "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
//   //     "item_quantity": 1,
//   //     "item_weight": "0.5",
//   //     "item_description": "asdasd",
//   //     "amount_to_collect": "456",
//   //     "suggested_address": {
//   //         "hub_id": 47,
//   //         "hub_name": "B.Baria",
//   //         "area_id": 7846,
//   //         "area_name": "DAKSHIN MORAIL",
//   //         "zone_id": 547,
//   //         "zone_name": "Brahamanbaria Sadar",
//   //         "is_implicit": true,
//   //         "district_id": 32,
//   //         "district_name": "B. Baria",
//   //         "score": 6.817621418169451,
//   //         "debug_info": null
//   //     }
//   // }

//   const headers = {
//     Authorization: `Bearer ${accessToken?.access_token}`,
//     "Content-Type": "application/json",
//     // Accept: "application/json",
//   };

//   console.log(
//     "data.items?.length > 1",
//     PathaoCourierData[0]?.storeId,
//     data.items[0]?.store_id,
//     "single items"
//   );

//   let storeId = 239581;
//   // let storeId = 252652;

//   if (PathaoCourierData[0]?.storeId && !isNaN(PathaoCourierData[0]?.storeId)) {
//     storeId = Number(PathaoCourierData[0]?.storeId);
//   } else if (data.items[0]?.store_id && !isNaN(data.items[0]?.store_id)) {
//     storeId = Number(data.items[0]?.store_id);
//   }

//   console.log(storeId, "storeId");

//   // const submitData = {
//   //   store_id: storeId,
//   //   merchant_order_id: generateInvoiceId(),
//   //   recipient_name: data.name,
//   //   recipient_phone: data.phone,
//   //   // recipient_secondary_phone: data.secondary_phone,
//   //   recipient_address: "Uttara , Sector -24, Dhaka",
//   //   // recipient_address: data.address,
//   //   recipient_city: Number(data.city_id),
//   //   recipient_zone: Number(data.zone_id),
//   //   recipient_area: Number(data.area_id),
//   //   delivery_type: 48,
//   //   // is_point_delivery: false,
//   //   item_type: 2,
//   //   special_instruction: data.special_instruction || "",
//   //   item_quantity: Number(data.items[0].quantity),
//   //   item_weight: data.totalWeight,
//   //   item_description: data.items[0].shortDescription,
//   //   amount_to_collect: Number(data.total),
//   //   // suggested_address: {
//   //   //   hub_id: 47,
//   //   //   hub_name: "B.Baria",
//   //   //   area_id: 7846,
//   //   //   area_name: "DAKSHIN MORAIL",
//   //   //   zone_id: 547,
//   //   //   zone_name: "Brahamanbaria Sadar",
//   //   //   is_implicit: true,
//   //   //   district_id: 32,
//   //   //   district_name: "B. Baria",
//   //   //   score: 6.817621418169451,
//   //   //   debug_info: null,
//   //   // },
//   // };

//   const submitData = {
//     store_id: storeId,
//     merchant_order_id: generateInvoiceId(),
//     recipient_name: "Demo Recipient",
//     recipient_phone: "01761515810",
//     recipient_address: "Uttara , Sector -24, Dhaka",
//     recipient_city: Number(data.city_id),
//     recipient_zone: Number(data.zone_id),
//     recipient_area: Number(data.area_id),
//     delivery_type: 48,
//     item_type: 2,
//     special_instruction: "Need to Delivery before 5 PM",
//     item_quantity: 1,
//     item_weight: 0.5,
//     item_description: "this is a Cloth item, price- 3000",
//     amount_to_collect: 900,
//   };

//   const requestData = {
//     store_id: 239581,
//     merchant_order_id: "",
//     recipient_name: "Anamul",
//     recipient_phone: "01961394375",
//     recipient_secondary_phone: "",
//     recipient_address: "1600 Fake Street",
//     recipient_city: 32,
//     recipient_zone: 547,
//     recipient_area: 7846,
//     delivery_type: 48,
//     is_point_delivery: false,
//     item_type: 2,
//     special_instruction: "",
//     item_quantity: 1,
//     item_weight: "0.5",
//     item_description: "",
//     amount_to_collect: "200",
//   };
//   console.log(submitData, "pathaoCourierOrderCreate", url, {
//     headers: headers,
//   });

//   try {
//     // if (data.items?.length > 1) {
//     //   console.log(
//     //     "data.items?.length > 1",
//     //     data.items?.length,
//     //     "multiple items"
//     //   );

//     //   console.log(
//     //     {
//     //       orders: data.items.map((item) => ({
//     //         store_id:
//     //           Number(PathaoCourierData[0]?.storeId) || Number(item.store_id),
//     //         merchant_order_id: generateInvoiceId(),
//     //         recipient_name: data.name,
//     //         recipient_phone: data.phone,
//     //         recipient_secondary_phone: data.secondary_phone,
//     //         recipient_address: data.address,
//     //         recipient_city: Number(data.city_id),
//     //         recipient_zone: Number(data.zone_id),
//     //         recipient_area: Number(data.area_id),
//     //         delivery_type: 48,
//     //         is_point_delivery: false,
//     //         item_type: 2,
//     //         special_instruction: data.special_instruction,
//     //         item_quantity: Number(item?.quantity),
//     //         item_weight: item?.weight,
//     //         item_description: item?.shortDescription,
//     //         amount_to_collect: `${data?.total}`,
//     //       })),
//     //     },
//     //     "data 0986"
//     //   );
//     //   submitData = {
//     //     orders: data.items.map((item) => ({
//     //       store_id:
//     //         Number(PathaoCourierData[0]?.storeId) || Number(item.store_id),
//     //       merchant_order_id: generateInvoiceId(),
//     //       recipient_name: data.name,
//     //       recipient_phone: data.phone,
//     //       recipient_secondary_phone: data.secondary_phone,
//     //       recipient_address: data.address,
//     //       recipient_city: Number(data.city_id),
//     //       recipient_zone: Number(data.zone_id),
//     //       recipient_area: Number(data.area_id),
//     //       recipient_address: data.address,
//     //       delivery_type: 48,
//     //       is_point_delivery: false,
//     //       item_type: 2,
//     //       special_instruction: data.special_instruction,
//     //       item_quantity: Number(item?.quantity),
//     //       item_weight: item?.weight,
//     //       item_description: item?.shortDescription,
//     //       amount_to_collect: `${data?.total}`,
//     //       // suggested_address: {
//     //       //   hub_id: 47,
//     //       //   hub_name: "B.Baria",
//     //       //   area_id: 7846,
//     //       //   area_name: "DAKSHIN MORAIL",
//     //       //   zone_id: 547,
//     //       //   zone_name: "Brahamanbaria Sadar",
//     //       //   is_implicit: true,
//     //       //   district_id: 32,
//     //       //   district_name: "B. Baria",
//     //       //   score: 6.817621418169451,
//     //       //   debug_info: null,
//     //       // },
//     //     })),
//     //     // orders: data.items.map((item) => ({
//     //     //   store_id: PathaoCourierData[0]?.storeId,
//     //     //   merchant_order_id: "asfdads",
//     //     //   recipient_name: "Anamul",
//     //     //   recipient_phone: "01987654321",
//     //     //   recipient_secondary_phone: "01987654323",
//     //     //   recipient_address: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
//     //     //   recipient_city: 32,
//     //     //   recipient_zone: 547,
//     //     //   recipient_area: 7846,
//     //     //   delivery_type: 48,
//     //     //   // is_point_delivery: false,
//     //     //   item_type: 2,
//     //     //   special_instruction: "B. Baria  Brahamanbaria Sadar  DAKSHIN MORAIL",
//     //     //   item_quantity: 1,
//     //     //   item_weight: "0.5",
//     //     //   item_description: "asdasd",
//     //     //   amount_to_collect: "456",
//     //     //   suggested_address: {
//     //     //     hub_id: 47,
//     //     //     hub_name: "B.Baria",
//     //     //     area_id: 7846,
//     //     //     area_name: "DAKSHIN MORAIL",
//     //     //     zone_id: 547,
//     //     //     zone_name: "Brahamanbaria Sadar",
//     //     //     is_implicit: true,
//     //     //     district_id: 32,
//     //     //     district_name: "B. Baria",
//     //     //     score: 6.817621418169451,
//     //     //     debug_info: null,
//     //     //   },
//     //     // })),
//     //   };

//     //   console.log(submitData, "pathaoCourierOrderCreate", url);

//     //   const response = await axios.post(url + "/bulk", submitData, {
//     //     headers: headers,
//     //   });

//     //   return response.data;
//     // } else {
//     // }

//     const response = await axios.post(url, submitData, {
//       headers: headers,
//     });

//     return response.data;
//   } catch (error) {
//     // console.error("Error creating order:", error);

//     error.success = false;
//     return error;
//   }
// };

export const pathaoCourierOrderCreate = async (data) => {
  try {
    // Retrieve Pathao configuration from the database or environment variables
    const PathaoCourierData = await PathaoModel.find({});
    const baseUrl =
      PathaoCourierData[0]?.baseUrl || process.env.PATHAO_COURIER_URL;

    if (!baseUrl) {
      throw new Error("Pathao base URL is not configured.");
    }

    const url = `${baseUrl}/aladdin/api/v1/orders`;
    const accessToken = await courierAccessToken();

    if (!accessToken?.access_token) {
      throw new Error("Failed to retrieve access token for Pathao.");
    }

    const headers = {
      Authorization: `Bearer ${accessToken.access_token}`,
      "Content-Type": "application/json",
    };

    // Determine store ID
    let storeId = 239581; // Default store ID
    if (
      PathaoCourierData[0]?.storeId &&
      !isNaN(PathaoCourierData[0]?.storeId)
    ) {
      storeId = Number(PathaoCourierData[0]?.storeId);
    } else if (data.items?.[0]?.store_id && !isNaN(data.items[0]?.store_id)) {
      storeId = Number(data.items[0]?.store_id);
    }

    // Prepare the payload
    // const submitData = {
    //   store_id: storeId,
    //   merchant_order_id: generateInvoiceId(),
    //   recipient_name: data.name,
    //   recipient_phone: data.phone,
    //   recipient_address: data.address,
    //   recipient_city: Number(data.city_id),
    //   recipient_zone: Number(data.zone_id),
    //   recipient_area: Number(data.area_id),
    //   delivery_type: 48, // Based on Pathao's documentation
    //   item_type: 2, // Adjust item type based on actual product
    //   special_instruction: data.special_instruction || "",
    //   item_quantity: Number(data.items?.[0]?.quantity || 1),
    //   item_weight: data.totalWeight || "0.5",
    //   item_description: data.items?.[0]?.shortDescription || "",
    //   amount_to_collect: Number(data.total || 0),
    // };

    const submitData = {
      store_id: storeId,
      merchant_order_id: generateInvoiceId(),
      recipient_name: data?.name,
      recipient_phone: data?.phone,
      recipient_address: data?.address,
      recipient_city: Number(data?.city_id),
      recipient_zone: Number(data?.zone_id),
      recipient_area: Number(data?.area_id),
      delivery_type: 48, // Based on Pathao's documentation
      item_type: 2, // Adjust item type based on actual product
      special_instruction: data?.special_instruction || "",
      item_quantity: Number(data?.totalItems || 1),
      item_weight: data?.totalWeight || "0.5",
      item_description: data?.orderOverview || "",
      amount_to_collect: Number(data.total || 0),
    };

    console.log("Request Payload:", submitData);

    // Make the API request
    const response = await axios.post(url, submitData, { headers });

    // Log and return the response
    console.log("Pathao API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating Pathao order:", error.message);
    throw new Error(`Pathao order creation failed: ${error.message}`);
  }
};

export async function courierCities(req, res) {
  const PathaoCourierData = await PathaoModel.find({});
  const url = `${
    PathaoCourierData[0]?.baseUrl || process.env.PATHAO_COURIER_URL
  }/aladdin/api/v1/city-list`;

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
  const SteadFastData = await SteadFastModel.find({});

  console.log(SteadFastData, "steadfast data");
  console.log(requestData, "request data");

  const url = `${
    SteadFastData[0]?.baseUrl || process.env.STEAD_FAST_COURIER_URL
  }/create_order`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  const headers = {
    "Content-Type": "application/json",
    "Api-Key":
      SteadFastData[0]?.apiKey || process.env.STEAD_FAST_COURIER_API_KEY,
    "Secret-Key":
      SteadFastData[0]?.secretKey || process.env.STEAD_FAST_COURIER_SECRET_KEY,
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

  try {
    let submitData;

    // if (requestData?.items?.length > 1) {
    //   submitData = {
    //     data: requestData.items.map((item) => ({
    //       invoice: generateInvoiceId(),
    //       recipient_name: requestData.name,
    //       recipient_phone: requestData.phone,
    //       secondary_contact: requestData.secondary_phone,
    //       recipient_address: requestData.address,
    //       cod_amount: Number(requestData.total),
    //       note: requestData.special_instruction,
    //     })),
    //   };

    //   console.log(submitData, "requestData");

    //   const response = await axios.post(url + "/bulk-order", submitData, {
    //     headers: headers,
    //   });

    //   console.log(response.data, "response.data store");

    //   return response.data;
    // } else {
    // }
    submitData = {
      invoice: generateInvoiceId(),
      recipient_name: requestData.name,
      recipient_phone: requestData.phone,
      secondary_contact: requestData.secondary_phone,
      recipient_address: requestData.address,
      cod_amount: requestData.total,
      note: requestData.special_instruction,
    };

    console.log(submitData, "requestData");

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

    throw new Error(error);
    // res.status(500).json({
    //   message: "Error creating SteadFast Order",
    //   error: error.response?.data || error.message,
    // });
  }
};

export const createCourierOrder = async (data) => {
  try {
    let response;
    console.log(data, "data courier");

    if (data?.courierMethod === "Pathao") {
      response = await pathaoCourierOrderCreate(data);
    } else if (data?.courierMethod === "SteadFast") {
      response = await courierSteadFastOrderCreate(data);
    }

    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    return new Error(error);
  }
};

// GET all PathaoCourier
export const getAllPathaoCourier = async (req, res) => {
  try {
    const PathaoCourierData = await PathaoModel.find({});
    res.status(200).json({ success: true, data: PathaoCourierData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new PathaoCourier
export const createPathaoCourier = async (req, res) => {
  try {
    const {
      baseUrl,
      clientId,
      storeId,
      clientSecret,
      clientEmail,
      clientPassword,
    } = req.body;

    if (
      !baseUrl ||
      !clientId ||
      !storeId ||
      !clientSecret ||
      !clientEmail ||
      !clientPassword
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const newPathaoCourier = await PathaoModel.create(req.body);
    res.status(200).json({ success: true, data: newPathaoCourier });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET PathaoCourier by ID
export const getPathaoCourierById = async (req, res) => {
  const { id } = req.params;
  try {
    const PathaoCourierReport = await PathaoModel.findById(id);
    if (!PathaoCourierReport) {
      return res
        .status(404)
        .json({ success: false, message: "PathaoCourier not found" });
    }
    res.status(200).json({ success: true, data: PathaoCourier });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update PathaoCourier by ID
export const updatePathaoCourierById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPathaoCourier = await PathaoModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedPathaoCourier) {
      return res
        .status(404)
        .json({ success: false, message: "PathaoCourier not found" });
    }
    res.status(200).json({ success: true, data: updatedPathaoCourier });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE PathaoCourier by ID
export const deletePathaoCourierById = async (req, res) => {
  const { id } = req.params;
  try {
    const PathaoCourier = await PathaoModel.findById(id);
    if (!PathaoCourier) {
      return res
        .status(404)
        .json({ success: false, message: "PathaoCourier not found" });
    }

    await PathaoModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "PathaoCourier deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET all SteadFast
export const getAllSteadFast = async (req, res) => {
  try {
    const SteadFastData = await SteadFastModel.find({});
    res.status(200).json({ success: true, data: SteadFastData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new SteadFast
export const createSteadFast = async (req, res) => {
  try {
    const { baseUrl, apiKey, secretKey } = req.body;

    if (!baseUrl || !apiKey || !secretKey) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const newSteadFast = await SteadFastModel.create(req.body);
    res.status(200).json({ success: true, data: newSteadFast });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET SteadFast by ID
export const getSteadFastById = async (req, res) => {
  const { id } = req.params;
  try {
    const SteadFastReport = await SteadFastModel.findById(id);
    if (!SteadFastReport) {
      return res
        .status(404)
        .json({ success: false, message: "SteadFast not found" });
    }
    res.status(200).json({ success: true, data: SteadFast });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update SteadFast by ID
export const updateSteadFastById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSteadFast = await SteadFastModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedSteadFast) {
      return res
        .status(404)
        .json({ success: false, message: "SteadFast not found" });
    }
    res.status(200).json({ success: true, data: updatedSteadFast });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE SteadFast by ID
export const deleteSteadFastById = async (req, res) => {
  const { id } = req.params;
  try {
    const SteadFast = await SteadFastModel.findById(id);
    if (!SteadFast) {
      return res
        .status(404)
        .json({ success: false, message: "SteadFast not found" });
    }

    await SteadFastModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "SteadFast deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getCourierOrderInfo = async (order) => {
  if (!order?.courierMethod) {
    throw new Error("Courier method is required");
  }
  if (order?.courierMethod === "Pathao") {
    return await getPathaoCourierOrderInfo(order);
  } else if (order?.courierMethod === "SteadFast") {
    return await getSteadFastOrderInfo(order);
  }
};

export const getPathaoCourierOrderInfo = async (order) => {
  const PathaoCourierData = await PathaoModel.find({});
  const url = `${
    PathaoCourierData[0]?.baseUrl || process.env.PATHAO_COURIER_URL
  }/aladdin/api/v1/orders/${order?.consignment_id}/info`;

  const accessToken = await courierAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response?.data, "response citeis", url, "url");

    return response?.data;

    // res.status(200).json({ success: true, data: order });
  } catch (error) {
    // console.error(
    //   "Error fetching access token:",
    //   error.response?.data || error.message
    // );
    throw new Error(error);
  }
};

export const getSteadFastOrderInfo = async (order) => {
  const SteadFastData = await SteadFastModel.find({});
  const url = `${
    SteadFastData[0]?.baseUrl || process.env.STEAD_FAST_COURIER_URL
  }/status_by_trackingcode`; // Replace with actual base URL
  // const accessToken = '<access_token>'; // Replace with your access token

  const headers = {
    "Content-Type": "application/json",
    "Api-Key":
      SteadFastData[0]?.apiKey || process.env.STEAD_FAST_COURIER_API_KEY,
    "Secret-Key":
      SteadFastData[0]?.secretKey || process.env.STEAD_FAST_COURIER_SECRET_KEY,
  };

  console.log(url, "url");

  try {
    const response = await axios.get(`${url}/${order?.tracking_code}`, {
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

    throw new Error(error);
    // res.status(500).json({
    //   message: "Error creating SteadFast Order",
    //   error: error.response?.data || error.message,
    // });
  }
};
