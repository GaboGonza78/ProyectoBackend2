import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'carts' },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN", "PREM"],
        index: true
      }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;




