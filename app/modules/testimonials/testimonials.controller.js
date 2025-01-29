import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import TestimonialsModel from "./testimonials.model.js";

// GET all testimonials with optional search filter
export async function getTestimonials(req, res) {
  const { search } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { customerName: { $regex: new RegExp(search, "i") } },
      { designation: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const testimonials = await TestimonialsModel.find(filter);
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// POST new testimonial
export async function postTestimonial(req, res) {
  try {
    const formData = req.body;
    const { customerName, designation, rating, description } = formData;

    if (!customerName || !designation || !rating || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const image = req?.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `other-image/testimonial/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const testimonialData = {
      customerName,
      designation,
      rating,
      description,
      image: thumbnailUrl,
    };
    const testimonialResult = await TestimonialsModel.create(testimonialData);
    res.status(200).json({ success: true, data: testimonialResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// GET testimonial by ID
export async function getTestimonialById(req, res) {
  const { id } = req.params;

  try {
    const result = await TestimonialsModel.findById(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// PUT (update) testimonial by ID
export async function updateTestimonial(req, res) {
  const { id } = req.params;
  try {
    const formData = req.body;
    const { customerName, designation, rating, description } = formData;

    const existingTestimonial = await TestimonialsModel.findById(id);
    if (!existingTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    const image = req?.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `other-image/testimonial/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const updatedData = {
      customerName,
      designation,
      rating,
      description,
    };

    if (image && image.size > 0) {
      updatedData.image = thumbnailUrl;
    }
    const updatedTestimonial = await TestimonialsModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    if (existingTestimonial.image !== updatedTestimonial.image) {
      await deleteFile(existingTestimonial.image);
    }

    res.status(200).json({ success: true, data: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// DELETE testimonial by ID
export async function deleteTestimonial(req, res) {
  const { id } = req.params;

  try {
    const deletedTestimonial = await TestimonialsModel.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    const deletedResponse = await deleteFile(deletedTestimonial.image);
    console.log(deletedResponse, "deletedResponse");
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
