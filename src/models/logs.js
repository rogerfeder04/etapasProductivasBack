import mongoose from "mongoose";

const logSchema= new mongoose.Schema(
    {
      user: {
        type: String,
        required: false,
      },
      action: {
        type: String,
        default: "NO SE REGISTRO UNA ACCION",
        required: true,
      },
      information: {
        date: Date
      },
    }
, { timestamps: true });



export default mongoose.model("Log", logSchema)