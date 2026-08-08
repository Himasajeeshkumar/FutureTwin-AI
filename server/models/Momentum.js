import mongoose from "mongoose";

const momentumSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },

        xp: {
            type: Number,
            default: 0,
            min: 0
        },

        todayXP: {
            type: Number,
            default: 0,
            min: 0
        },

        todayXPDate: {
            type: String,
            default: ""
        },

        weeklyXP: {
            type: [Number],
            default: [0, 0, 0, 0, 0, 0, 0]
        },

        weekKey: {
            type: String,
            default: ""
        },

        completedActivities: {
            type: [String],
            default: []
        },

        completedMissions: {
            type: [String],
            default: []
        },

        achievements: {
            type: [String],
            default: []
        },

        streak: {
            type: Number,
            default: 0,
            min: 0
        },

        lastActivityDate: {
            type: String,
            default: ""
        },

        totalStudyMinutes: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "Momentum",
    momentumSchema
);