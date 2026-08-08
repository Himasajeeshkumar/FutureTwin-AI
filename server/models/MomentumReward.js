import mongoose from "mongoose";

const momentumRewardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        activityKey: {
            type: String,
            required: true
        },

        activityType: {
            type: String,
            required: true
        },

        xp: {
            type: Number,
            required: true,
            min: 0
        },

        dateKey: {
            type: String,
            required: true
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);


/*
 * Prevent the same activity reward
 * from being created twice.
 */
momentumRewardSchema.index(
    {
        userId: 1,
        activityKey: 1
    },
    {
        unique: true
    }
);


export default mongoose.model(
    "MomentumReward",
    momentumRewardSchema
);