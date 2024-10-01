import mongoose from "mongoose";

const logSchema= new mongoose.Schema(
    {
      user: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      action: {
        type: String,
        default: "NO SE REGISTRO UNA ACCION",
        required: true,
      },
      information: {
        type: Object,
      },
    },
    {
      timestamps: true,
    }
  
, { timestamps: true });



export default mongoose.model("Log", logSchema)