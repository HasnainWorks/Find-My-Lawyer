import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    caseno: {
      type: String,
      required: true,
      trim: true,
    },

    expertise: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    lawyerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);

export default CaseStudy;