import mongoose from "mongoose";

const apprenticeShema = new mongoose.Schema({
    fiche: { idFiche: mongoose.Schema.Types.ObjectId, name: String, number: String },
    tpDocument: { type: String, required: true },
    numDocument: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    personalEmail: { type: String, required: true },
    institutionalEmail: { type: String, required: true },
    modality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality' },
    hoursExecutedPS: { type: Number },
    hoursPendingPS: { type: Number },
    hoursTotalPE: { type: Number, default: 864 },
    status: { type: Number, required: true, default: 1 },
}, { timestamps: true })

export default mongoose.model("Apprentice", apprenticeShema)