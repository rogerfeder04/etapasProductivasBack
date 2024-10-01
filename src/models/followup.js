import mongoose  from 'mongoose';

const followupSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'assigment', require: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'instructor', require: true },
    number: { type: Number, required: true, enum: [1, 2, 3] },
    month: { type: Date, require: true },
    document: { type: String, require: true },
    status: { type: Number, require: true, default: 1 }, //estados hablados
    users: { type: String, require: true },
    observations: [{
        observation: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId},
        observationDate: {type: Date, default: Date.now}
      }],
    createdAt: { type: Date, require: true },
    updatedAt: { type: Date, require: true }
}, { timestamps: true })


export default mongoose.model("Followup", followupSchema)