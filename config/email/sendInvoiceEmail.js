import moment from "moment";
import GeneralInfoModel from "../../app/modules/GeneralInfo/generalInfo.model.js";
import WebsiteSEO_Model from "../../app/modules/WebsiteSEO/websiteSEO.model.js";
import { sendEmail } from "./emailFormats/SendEmail/sendEmail.js";

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
//   order_date,
// }) => `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Order Confirmation</title>
//     <style>

//         body {
//             font-family: 'Poppins', Arial, sans-serif;
//             background-color: #f8f9fa;
//             margin: 0;
//             padding: 20px;
//         }
//         .email-container {
//             max-width: 700px;
//             margin: 0 auto;
//             background: #ffffff;
//             border-radius: 16px;
//             overflow: hidden;
//             box-shadow: 0 8px 30px rgba(0,0,0,0.1);
//             position: relative;
//         }
//         .header {
//             background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
//             color: white;
//             padding: 40px 30px;
//             text-align: center;
//             position: relative;
//         }
//         .header img {
//             height: 50px;
//             margin-bottom: 20px;
//         }
//         .header:after {
//             content: '';
//             position: absolute;
//             bottom: -20px;
//             left: 0;
//             right: 0;
//             height: 40px;
//             background: white;
//             border-radius: 20px 20px 0 0;
//         }
//         .content {
//             padding: 40px 30px;
//             color: #4a5568;
//         }
//         .order-status {
//             display: flex;
//             align-items: center;
//             margin-bottom: 30px;
//         }
//         .status-badge {
//             background: #10b981;
//             color: white;
//             padding: 8px 20px;
//             border-radius: 20px;
//             font-size: 14px;
//             display: inline-flex;
//             align-items: center;
//             gap: 8px;
//         }
//         .status-badge svg {
//             width: 16px;
//             height: 16px;
//         }
//         .order-details {
//             background: #f8fafc;
//             border-radius: 12px;
//             padding: 25px;
//             margin: 25px 0;
//             border: 1px solid #e2e8f0;
//         }
//         .detail-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//             gap: 20px;
//             margin-bottom: 30px;
//         }
//         .detail-item strong {
//             display: block;
//             color: #64748b;
//             font-size: 14px;
//             margin-bottom: 5px;
//         }
//         .detail-item p {
//             margin: 0;
//             font-weight: 500;
//             color: #1e293b;
//         }
//         table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 25px 0;
//         }
//         th {
//             background: #f1f5f9;
//             color: #64748b;
//             padding: 15px;
//             text-align: left;
//             font-size: 14px;
//         }
//         td {
//             padding: 15px;
//             border-bottom: 1px solid #e2e8f0;
//         }
//         tr:last-child td {
//             border-bottom: none;
//         }
//         .total-section {
//             background: #f8fafc;
//             padding: 20px;
//             border-radius: 12px;
//             margin-top: 25px;
//         }
//         .total-line {
//             display: flex;
//             justify-content: space-between;
//             margin: 10px 0;
//         }
//         .grand-total {
//             font-size: 18px;
//             font-weight: 600;
//             color: #1e293b;
//         }
//         .footer {
//             text-align: center;
//             padding: 25px;
//             background: #f1f5f9;
//             color: #64748b;
//             font-size: 14px;
//         }
//         @media (max-width: 600px) {
//             .email-container {
//                 border-radius: 0;
//             }
//             .detail-grid {
//                 grid-template-columns: 1fr;
//             }
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <img src="https://mgpwebaps.s3.eu-north-1.amazonaws.com/multi-sports/${website_logo}" alt="${website_name} logo">
//             <div class="order-status">
//                 <div class="status-badge">
//                     <svg viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
//                     </svg>
//                     Order Confirmed
//                 </div>
//             </div>
//         </div>

//         <div class="content">
//             <h2 style="margin: 0 0 20px; color: #1e293b;">Thank you, ${name}! 🎉</h2>
//             <p style="margin-bottom: 30px;">Your order from ${website_name} has been successfully placed. We're preparing your items and will notify you when they're on their way.</p>

//             <div class="detail-grid">
//                 <div class="detail-item">
//                     <strong>Order Date</strong>
//                     <p>${order_date}</p>
//                 </div>
//                 <div class="detail-item">
//                     <strong>Order Number</strong>
//                     <p>#${Math.floor(100000 + Math.random() * 900000)}</p>
//                 </div>
//                 <div class="detail-item">
//                     <strong>Payment Method</strong>
//                     <p>${payment_method}</p>
//                 </div>
//                 <div class="detail-item">
//                     <strong>Delivery Address</strong>
//                     <p>${address}${areaName ? `<br>${areaName}` : ""}${
//   cityName ? `<br>${cityName}` : ""
// }</p>
//                 </div>
//             </div>

//             <div class="order-details">
//                 <h3 style="margin-top: 0; color: #1e293b;">Order Summary</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Item</th>
//                             <th>Qty</th>
//                             <th style="text-align: right;">Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${items
//                           .map(
//                             (item) => `
//                             <tr>
//                                 <td>${item.productTitle}</td>
//                                 <td>${item.quantity}</td>
//                                 <td style="text-align: right;">$${item.price}</td>
//                             </tr>
//                         `
//                           )
//                           .join("")}
//                     </tbody>
//                 </table>

//                 <div class="total-section">
//                     <div class="total-line">
//                         <span>Subtotal:</span>
//                         <span>$${total - deliveryCharge}</span>
//                     </div>
//                     <div class="total-line">
//                         <span>Delivery:</span>
//                         <span>$${deliveryCharge}</span>
//                     </div>
//                     ${
//                       coupon
//                         ? `
//                     <div class="total-line" style="color: #10b981;">
//                         <span>Discount (${coupon.code}):</span>
//                         <span>-$${coupon.amount}</span>
//                     </div>`
//                         : ""
//                     }
//                     <div class="total-line grand-total">
//                         <span>Total Amount:</span>
//                         <span>$${total}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="footer">
//             <p>Need help? Contact our support team at support@${website_name}.com</p>
//             <p>&copy; ${new Date().getFullYear()} ${website_name}. All rights reserved.</p>
//         </div>
//     </div>
// </body>
// </html>`;

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
                <p><strong>Order Date:</strong> ${moment().format(
                  "YYYY-MM-DD HH:mm:ss"
                )}</p>
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
