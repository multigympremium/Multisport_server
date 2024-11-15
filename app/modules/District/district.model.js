import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: [true, "District is required"],
    },
    subdistricts: {
      type: Array,
      required: [true, "Subdistricts is required"],
    },
    
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const DistrictModel =  mongoose.model('districts', districtSchema);

export default DistrictModel