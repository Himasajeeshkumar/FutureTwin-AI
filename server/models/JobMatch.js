import mongoose from "mongoose";

const jobMatchSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    resume: String,

    jobDescription: String,

    result: Object

}, { timestamps: true });

export default mongoose.model("JobMatch", jobMatchSchema);