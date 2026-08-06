import mongoose from "mongoose";

const skillGapSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    career: String,

    skills: [String],

    result: Object

}, { timestamps: true });

export default mongoose.model("SkillGap", skillGapSchema);