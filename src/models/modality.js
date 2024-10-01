import mongoose from "mongoose";

const modalitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    hourInstructorFollow: { type: String, required: true }, //2 x4 (8 total)
    hourInstructorTechnical: { type: String, required: true }, //4 proyecto empresarial 8 proyecto productivo x6
    hourInstructorProject: { type: String, required: true } //8 proyecto empresarial o productivo x6
    
}, { timestamps: true });



export default mongoose.model("Modality", modalitySchema);