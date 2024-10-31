import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    idApprentice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apprentices' }],
    idModality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality' },
    assignament: [
        {
            followUpInstructor: { idInstructor: mongoose.Schema.Types.ObjectId, name: String, email: String, hour: Number, status: Number },
            technicalInstructor: { idInstructor: mongoose.Schema.Types.ObjectId, name: String, email: String, hour: Number, status: Number},
            projectInstructor: { idInstructor: mongoose.Schema.Types.ObjectId, name: String, email: String, hour: Number, status: Number },
            status: { type: Number },
        }],
    startDate: { type: Date },
    endDate: { type: Date },
    company: { type: String },
    phoneCompany: { type: String },
    addressCompany: { type: String },
    owner: { type: String },
    docAlternative: { type: String },
    hourFollowupExcuted: { type: Number },
    businessProyectHourExcuted: { type: Number },
    productiveProjectHourExcuted: { type: Number },
    technicalHourPending: [{technicalInstructor: { idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number, status: Number }}],
    ProyectHourPending: [{projectInstructor: { idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number, status: Number }}],
    mailCompany: { type: String },
    certificationDoc: { type: String},
    judymentPhoto: { type: String },
    status: { type: Number, default: 1 }
}, { timestamps: true });

// const registerSchema = new mongoose.Schema({
//     idApprentice: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprentices'},
//     idModality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality'},
//     startDate: { type: Date },
//     endDate: { type: Date },
//     company: { type: String },
//     phoneCompany: { type: String },
//     addressCompany: { type: String },
//     owner: { type: String },
//     docAlternative: { type: String },
//     hour : { type: Number },
//     businessProyectHour: { type: Number },
//     productiveProjectHour: { type: Number },
//     status: { type: Number, default: 1 },
//     mailCompany :{ type: String },
// }, { timestamps: true });

export default mongoose.model("Register", registerSchema);

// 2 campos más horas empresariales, hora productivas