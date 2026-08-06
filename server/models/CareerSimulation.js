import mongoose from "mongoose";

const simulationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    career: String,

    skills: [String],

    result: Object

}, { timestamps: true });

export default mongoose.model("CareerSimulation", simulationSchema);