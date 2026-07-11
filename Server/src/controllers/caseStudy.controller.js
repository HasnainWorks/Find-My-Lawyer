import casestudy from "../models/caseStudySchema.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const postCaseStudy = async (req, res) => {
  console.log(req.file);

  try {
    const { name, caseno, expertise, description } = req.body;

    // assuming middleware already attaches logged-in lawyer
    const lawyer = req.lawyer;

    if (!lawyer) {
      return res.status(401).json({
        message: "Only lawyers can upload case studies",
      });
    }

    if (!name || !caseno || !expertise || !description || !req.file) {
      return res.status(400).json({
        message: "All fields including image are required",
      });
    }

    const localFilePath = req.file.path;

    const uploadedImage = await uploadOnCloudinary(localFilePath);

    if (!uploadedImage) {
      return res.status(400).json({
        message: "Image upload to Cloudinary failed",
      });
    }

    const caseStudy = new casestudy({
      name,
      caseno,
      expertise,
      description,
      image: uploadedImage.secure_url,
      lawyerID: lawyer._id,
      lawyerName: lawyer.name,
    });

    const saved = await caseStudy.save();

    res.status(201).json({
      message: "Case study posted successfully",
      data: saved,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while posting case study");
  }
};

const getAllCaseStudies = async (req, res) => {
  try {
    const casestudies = await casestudy
      .find({})
      .populate("lawyerID", "name city");

    if (!casestudies || casestudies.length === 0) {
      return res.status(404).json({
        message: "No case studies found",
      });
    }

    return res.status(200).json({
      data: casestudies,
      message: "Case studies retrieved successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send(
      "Something went wrong while finding case studies!"
    );
  }
};

export { postCaseStudy, getAllCaseStudies };

