import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required : [true, "Please provide a coupon name"]
    },
    discount: {
        type: String,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model("Coupon", couponSchema)