import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min:4,
        max:12
    },
    password: {
        type: String,
        required: true,
        min:6,
    }
})

export default mongoose.model("User", userSchema);