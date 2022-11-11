import { Schema } from "mongoose";

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    // productObjectId: String,
    products: [{   
        name: String,
        quantity: Number,
    }],
});

export { CartSchema };