import mongoose  from 'mongoose';

const followupSchema = new mongoose.Schema({
    assignament: { type: mongoose.Schema.Types.ObjectId, ref: 'assigment', require: true },
    instructor: { idInstructor: mongoose.Schema.Types.ObjectId, name: String },
    number: { type: Number, required: true, enum: [1, 2, 3] },
    month: { type: Date, require: true },
    document: { type: String, require: true },
    status: { type: Number, require: true, default: 1 }, //estados hablados
    observations: [{
        observation: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId},
        observationDate: {type: Date, default: Date.now}
      }]
}, { timestamps: true })


export default mongoose.model("Followup", followupSchema)