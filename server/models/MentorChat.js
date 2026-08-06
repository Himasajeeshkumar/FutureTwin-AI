import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    question: String,

    answer: String

}, { timestamps: true });

export default mongoose.model("MentorChat", mentorSchema);