import GeneralInfoModel from "../../app/modules/GeneralInfo/generalInfo.model.js";
import WebsiteSEO_Model from "../../app/modules/WebsiteSEO/websiteSEO.model.js";
import { sendEmail } from "./emailFormats/SendEmail/sendEmail.js";

export const generateEmailTemplate = ({
  name,
  phone,
  address,
  cityName,
  areaName,
  items,
  payment_method,
  total,
  deliveryCharge,
  coupon,
  createdAt,
  website_name,
  website_logo,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
              background: #d8d8d8;
              color: white;
              text-align: center;
              padding: 10px 30px;
          }
          .header img {
              width: 100px;
              margin-bottom: 15px;
          }
          
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333;
        }
        .content p {
            margin: 8px 0;
            color: #555;
        }
        .order-details {
            margin: 20px 0;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-details table th, .order-details table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .order-details table th {
            background: #d8d8d8;
        }
        .footer {
            background-color: #d8d8d8;
            text-align: center;
            padding: 10px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
        <img src="https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${website_logo}" alt="logo" >
            
        </div>
        <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for shopping with us. Here are your order details:</p>
            <div class="order-details">
                <h3>Order Summary</h3>
                <p><strong>Order Date:</strong> ${new Date(
                  createdAt
                ).toLocaleDateString()}</p>
                <p><strong>Delivery Address:</strong> ${address}, ${
  areaName ? ", " + areaName : ""
} ${cityName ? "," + cityName : ""}</p>
                <p><strong>Contact:</strong> ${phone}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                          .map(
                            (item) => `
                        <tr>
                            <td>${item.productTitle}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price}</td>
                        </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <p><strong>Delivery Charge:</strong> $ ${deliveryCharge}</p>
                <p><strong>Total Amount:</strong> $ ${total}</p>
                
                <p><strong>Payment Method:</strong> ${payment_method}</p>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${website_name}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

// export const generateEmailTemplate = ({
//   name,
//   phone,
//   address,
//   cityName,
//   areaName,
//   items,
//   payment_method,
//   total,
//   deliveryCharge,
//   coupon,
//   createdAt,
//   website_name,
//   website_logo,
// }) => `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Order Confirmation</title>
//       <style>
//           body {
//               font-family: 'Arial', sans-serif;
//               background-color: #f4f7fc;
//               margin: 0;
//               padding: 0;
//           }
//           .email-container {
//               max-width: 700px;
//               margin: 20px auto;
//               background: #ffffff;
//               border-radius: 12px;
//               box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//               overflow: hidden;
//               font-size: 16px;
//               color: #333;
//           }
//           .header {
//               background: linear-gradient(45deg, #5A67D8, #4C51BF);
//               color: white;
//               text-align: center;
//               padding: 30px;
//           }
//           .header img {
//               width: 100px;
//               margin-bottom: 15px;
//           }
//           .header h1 {
//               font-size: 28px;
//               margin: 0;
//               letter-spacing: 1px;
//               font-weight: 700;
//           }
//           .content {
//               padding: 40px;
//           }
//           .content h2 {
//               color: #4A4A4A;
//               font-size: 24px;
//           }
//           .content p {
//               margin: 10px 0;
//               color: #666;
//           }
//           .order-details {
//               margin-top: 30px;
//               background: #f9f9f9;
//               padding: 25px;
//               border-radius: 8px;
//               box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
//           }
//           .order-details h3 {
//               font-size: 20px;
//               margin-bottom: 10px;
//               color: #2D3748;
//           }
//           .order-details table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-top: 20px;
//           }
//           .order-details table th, .order-details table td {
//               padding: 12px;
//               text-align: left;
//               border-bottom: 1px solid #e0e0e0;
//           }
//           .order-details table th {
//               background-color: #4CAF50;
//               color: white;
//               font-weight: 600;
//           }
//           .order-details table td {
//               color: #555;
//           }
//           .order-details .total-row {
//               font-weight: 600;
//               background-color: #F1F1F1;
//           }
//           .footer {
//               background-color: #333;
//               color: white;
//               text-align: center;
//               padding: 20px;
//               font-size: 14px;
//           }
//           .footer p {
//               margin: 0;
//           }
//           .footer a {
//               color: #4CAF50;
//               text-decoration: none;
//           }
//           .footer a:hover {
//               text-decoration: underline;
//           }
//       </style>
//   </head>
//   <body>
//       <div class="email-container">
//           <div class="header">
//               <img src="https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${website_logo}" alt="logo">
//               <h1>${website_name}</h1>
//           </div>
//           <div class="content">
//               <h2>Hello ${name},</h2>
//               <p>Thank you for shopping with us. We're excited to let you know your order has been received and is being processed. Here are the details:</p>
//               <div class="order-details">
//                   <h3>Order Summary</h3>
//                   <p><strong>Order Date:</strong> ${new Date(
//                     createdAt
//                   ).toLocaleDateString()}</p>
//                   <p><strong>Delivery Address:</strong> ${address}, ${areaName}, ${cityName}</p>
//                   <p><strong>Contact:</strong> ${phone}</p>
//                   <table>
//                       <thead>
//                           <tr>
//                               <th>Product</th>
//                               <th>Quantity</th>
//                               <th>Price</th>
//                           </tr>
//                       </thead>
//                       <tbody>
//                           ${items
//                             .map(
//                               (item) => `
//                           <tr>
//                               <td>${item.productTitle}</td>
//                               <td>${item.quantity}</td>
//                               <td>$${item.price}</td>
//                           </tr>`
//                             )
//                             .join("")}
//                       </tbody>
//                   </table>
//                   <p><strong>Delivery Charge:</strong> $${deliveryCharge}</p>
//                   <p class="total-row"><strong>Total Amount:</strong> $${total}</p>
//                   ${
//                     coupon
//                       ? `<p><strong>Coupon Applied:</strong> ${coupon}</p>`
//                       : ""
//                   }
//                   <p><strong>Payment Method:</strong> ${payment_method}</p>
//               </div>
//           </div>
//           <div class="footer">
//               <p>&copy; 2025 ${website_name}. All rights reserved.</p>
//               <p>For support, <a href="mailto:support@${website_name}.com">contact us</a>.</p>
//           </div>
//       </div>
//   </body>
//   </html>`;

async function sendInvoiceEmail({ recipients, data }) {
  const general_info = await GeneralInfoModel.find();
  const seo_info = await WebsiteSEO_Model.find();
  data.website_name = general_info[0]?.company_name;
  data.website_logo = seo_info[0]?.metaOgImage;
  const template = generateEmailTemplate(data);

  //   await sendEmailWithResend(
  //     recipients,
  //     `${profileData?.name} - Invoice`,
  //     template
  //   );
  const mailResult = await sendEmail({
    to: recipients,
    subject: "Invoice",
    message: template,
  });

  return mailResult;
}

export default sendInvoiceEmail;
