import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    idApprentice: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprentices'},
    idModality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality'},
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    company: { type: String, required: true },
    phoneCompany: { type: String, required: true },
    addressCompany: { type: String, required: true },
    owner: { type: String, required: true },
    docAlternative: { type: String, required: true },
    hour : { type: Number, required: true },
    businessProyectHour: { type: Number },
    productiveProjectHour: { type: Number },
    status: { type: Number, required: true, default: 1 },
    mailCompany :{ type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Register", registerSchema);

// 2 campos más horas empresariales, hora productivas