import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    resumeText: String,

    parsedResume: Object,

    analysis: Object

}, {

    timestamps: true

});

export default mongoose.model("Resume", resumeSchema);