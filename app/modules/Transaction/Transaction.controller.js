import moment from "moment";
import { generateMonthlyTransactionData } from "../../helpers/generateDailyAndMonthlyData.js";
import currentMonthlyDate from "../../helpers/currentMonthlyDate.js";
import OrderModel from "../Orders/orders.model.js";

export async function createTransaction(req, res) {
  try {
    const transactionData = req.body;

    const result = await OrderModel.create(transactionData);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getAllTransactions(req, res) {
  const branch = req.query;
  console.log(branch, "branch");

  try {
    const result = await OrderModel.find().sort({
      transaction: -1,
    });
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// export async function getAllTransaction(req, res) {
//   const { branch, start_date, end_date, transaction_type } = req.query;
//   console.log(branch, "branch", start_date, end_date, transaction_type);

//   const startDate = start_date
//     ? moment(start_date).format("YYYY-MM-DD")
//     : moment().format("YYYY-MM-DD");
//   const endDate = end_date
//     ? moment(end_date).format("YYYY-MM-DD")
//     : moment(startDate).format("YYYY-MM-DD");

//   try {
//     const result = await OrderModel.find({
//       branch: branch,
//       transaction_date: { $gte: startDate, $lte: endDate },
//     }).sort({
//       created_at: -1,
//     });
//     const summary = await OrderModel.aggregate([
//       {
//         $match: {
//           transaction_date: {
//             $gte: startDate,
//             $lte: endDate,
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalIncome: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$transaction_type", "income_service"] },
//                 { $toDouble: "$amount" }, // Convert amount to double (float)
//                 0,
//               ],
//             },
//           },
//           totalExpense: {
//             $sum: {
//               $cond: [
//                 { $ne: ["$transaction_type", "income_service"] },
//                 { $toDouble: "$amount" }, // Convert amount to double (float)
//                 0,
//               ],
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           cumulativeBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
//           income: "$totalIncome",
//           expense: "$totalExpense",
//         },
//       },
//     ]);

//     res.json({ data: result, summary });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// }

// Generate monthly report
async function generateMonthlyReport(filter, startDate, endDate) {
  const invoiceMonthlyData = await OrderModel.aggregate([
    { $match: filter },
    {
      $group: {
        _id: "$transaction_date",
        income: { $sum: { $toDouble: "$total" } },
        discount: { $sum: { $toDouble: "$discount" } },
        itemPerDiscount: { $sum: { $toDouble: "$itemPerDiscount" } },
        items: { $sum: { $toDouble: "$totalItems" } },
        deliveryFee: { $sum: { $toDouble: "$deliveryCharge" } },
      },
    },
    {
      $project: {
        date: "$_id",
        total: "$income",
        totalDiscount: "$discount",
        totalItemPerDiscount: "$itemPerDiscount",
        totalItems: "$items",
        totalDeliveryFee: "$deliveryFee",
        _id: 0,
      },
    },
  ]);

  // Generate monthly transaction data (filling gaps if needed)
  return generateMonthlyTransactionData({
    data: invoiceMonthlyData,
    startDate,
    endDate,
  });
}

// Generate summary data
async function generateSummary(filter) {
  return await OrderModel.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        income: { $sum: { $toDouble: "$total" } },
        discount: { $sum: { $toDouble: "$discount" } },
        itemPerDiscount: { $sum: { $toDouble: "$itemPerDiscount" } },
        items: { $sum: { $toDouble: "$totalItems" } },
        deliveryFee: { $sum: { $toDouble: "$deliveryCharge" } },
      },
    },
    {
      $project: {
        total: "$income",
        totalDiscount: "$discount",
        totalItemPerDiscount: "$itemPerDiscount",
        totalItems: "$items",
        totalDeliveryFee: "$deliveryFee",
        _id: 0,
      },
    },
  ]);
}

// Generate method-wise summary
async function generateMethodSummary(filter) {
  return await OrderModel.aggregate([
    { $match: filter },
    {
      $group: {
        _id: "$payment_method",
        method_name: { $first: "$payment_method" },
        income: { $sum: { $toDouble: "$total" } },
        discount: { $sum: { $toDouble: "$discount" } },
        itemPerDiscount: { $sum: { $toDouble: "$itemPerDiscount" } },
        items: { $sum: { $toDouble: "$totalItems" } },
        deliveryFee: { $sum: { $toDouble: "$deliveryCharge" } },
      },
    },
    {
      $project: {
        method_name: "$method_name",
        total: "$income",
        totalDiscount: "$discount",
        totalItemPerDiscount: "$itemPerDiscount",
        totalItems: "$items",
        totalDeliveryFee: "$deliveryFee",
        _id: 0,
      },
    },
  ]);
}

// Calculate cumulative balance
async function calculateCumulativeBalance(startDate, endDate) {
  return await OrderModel.aggregate([
    {
      $match: {
        transaction_date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        income: { $sum: { $toDouble: "$total" } },
        discount: { $sum: { $toDouble: "$discount" } },
      },
    },
    {
      $project: {
        total: { $subtract: ["$income", "$discount"] },
        _id: 0,
      },
    },
  ]);
}

export async function getAllTransaction(req, res) {
  try {
    const {
      start_date,
      end_date,
      time_frame,
      receiver,
      search,
      isAddFilterWithSearch,
    } = req.query;

    // Date formatting and defaults
    const startDate = start_date
      ? moment(start_date).format("YYYY-MM-DD")
      : moment().startOf("month").format("YYYY-MM-DD");
    const endDate = end_date
      ? moment(end_date).format("YYYY-MM-DD")
      : moment(startDate).endOf("month").format("YYYY-MM-DD");

    // Base filter
    let filter = { status: "Completed" };

    // Add date filter
    if (startDate && endDate) {
      filter.transaction_date = { $gte: startDate, $lte: endDate };
    }

    // // Add receiver filter
    // if (receiver) {
    //   filter.email = receiver;
    // }

    // Add search filter
    if (search) {
      filter.$or = [
        { email: { $regex: new RegExp(search, "i") } },
        { phone: { $regex: new RegExp(search, "i") } },
        { name: { $regex: new RegExp(search, "i") } },
        { secondary_phone: { $regex: new RegExp(search, "i") } },
        { city_name: { $regex: new RegExp(search, "i") } },
        { area_name: { $regex: new RegExp(search, "i") } },
      ];
    }

    console.log(filter, "filter");

    // Fetch reports based on time_frame
    let reports = [];
    if (time_frame === "daily") {
      reports = await OrderModel.find(filter).sort({ createdAt: -1 });
    } else if (time_frame === "monthly") {
      reports = await generateMonthlyReport(filter, startDate, endDate);
    }

    // Summary data
    const summary = await generateSummary(filter);
    const method_summary = await generateMethodSummary(filter);
    const cumulativeBalance = await calculateCumulativeBalance(
      startDate,
      endDate
    );

    // Response
    res.status(200).json({
      data: reports,
      summary: summary.length > 0 ? summary : [],
      method_summary,
      cumulativeBalance: cumulativeBalance[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error in getAllTransaction:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
export async function removeTransaction(req, res, next) {
  const id = req.params.id;
  try {
    const TransactionSingleData = await OrderModel.findById(id);
    // if (!TransactionSingleData) {
    //   if (!InvoiceSingleData) {
    //     return ({ message: "Data is not Found" });
    //   }
    // }

    const result = await OrderModel.findByIdAndDelete(id);

    // if (result) {
    //   res.status(200).json({
    //     data: result,
    //     message: "Data deleted successfully",
    //   });
    // } else {
    //   res.status(400).json({ message: "Data not found" });
    // }
    return next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getAllExpense(req, res) {
  const { branch, year, month } = req.query;

  let dailyReports;

  let filter = {
    branch: branch,
    transaction_type: "expense",
    transaction_date: {
      $gte: moment(new Date(year, month - 1, 1)).format("YYYY-MM-DD"),
      $lt: moment(new Date(year, month, 1)).format("YYYY-MM-DD"),
    },
  };

  try {
    console.log(filter, "dailyReports");
    const monthlyReports = await OrderModel.aggregate([
      {
        $match: {
          ...filter,
        },
      },

      {
        $group: {
          _id: "$transaction_name",
          total: {
            $sum: {
              $toDouble: "$amount",
            },
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          transaction_name: "$transaction_name",
          total: "$total",
          totalIncome: "$totalIncome",
          totalAdmissionFees: "$totalAdmissionFees",
          totalPackageFees: "$totalPackageFees",

          discount: "$discount",
        },
      },
    ]);
    res.status(200).json({
      data: monthlyReports,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
