import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    idApprentice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apprentices' }],
    idModality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality' },
    assignment: [
        {
            followupInstructor: [{
                idInstructor: { type: mongoose.Schema.Types.ObjectId },
                name: { type: String },
                email: { type: String },
                status: { type: Number },
                _id: false
            }],
            technicalInstructor: [{
                idInstructor: { type: mongoose.Schema.Types.ObjectId },
                name: { type: String },
                email: { type: String },
                status: { type: Number },
                _id: false
            }],
            projectInstructor: [{
                idInstructor: { type: mongoose.Schema.Types.ObjectId },
                name: { type: String },
                email: { type: String },
                status: { type: Number },
                _id: false
            }],
            status: { type: Number },
            _id: false
        }],
    startDate: { type: Date },
    endDate: { type: Date },
    company: { type: String },
    phoneCompany: { type: String },
    addressCompany: { type: String },
    owner: { type: String },
    docAlternative: { type: String },
    followupHoursExcuted: [{ idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number }],
    technicalHourExcuted: [{ idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number }],
    businessProyectHourExcuted: [{ idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number }],
    followupHoursPending: [{ idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number }],
    technicalHourPending: [{ idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number }],
    businessProyectHourPending: [{ idInstructor: mongoose.Schema.Types.ObjectId, name: String, hour: Number }],
    hourProductiveStageApprentice: { type: Number },
    mailCompany: { type: String },
    certificationDoc: { type: String },
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