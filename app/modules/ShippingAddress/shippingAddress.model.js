import mongoose from 'mongoose';

const ShippingAddressSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: [true, 'Recipient Name is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
  },
  district: {
    type: String,
    required: [true, 'District/City is required'],
  },
  area: {
    type: String,
    required: [true, 'Area/Thana/Upazilla is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  postCode: {
    type: String,
    required: [true, 'Post Code is required'],
  },
  deliveryType: {
    type: String,
    enum: ['Home', 'Office'],
    default: 'Home',
  },
  email: {
    type: String,
  },
  userId: {
    type: String,
  }
}, {
  timestamps: true
});

const ShippingAddress =  mongoose.models.shipping_addresses || mongoose.model('shipping_addresses', ShippingAddressSchema);


export default ShippingAddress