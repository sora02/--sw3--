import { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    summaryTitle: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: new Schema(
        {
          addressinput: String,
          detailAddress: String,
          receiverNameInput: String,
          phoneNum: String,
          memo: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    deliverystatus: {
        type: String,
        required: true,
        default: "입금확인",
    },
  },
  {
    timestamps: true,
  }
);

export { OrderSchema };
