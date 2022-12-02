import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    personwhoordered: {
      type: Schema.Types.ObjectId,
      ref: "UserSchema"
    },
    alprice: {
      type: Number,
    },
    deliverystatus: {
        type: String,
        required: true,
        default: "입금확인",
    },
    address:{
        type: String,
    },
    recipientname:{
        type: String,
    },
    recipientphonenumber:{
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
