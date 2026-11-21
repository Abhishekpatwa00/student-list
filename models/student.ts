import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  parent_name: string;
  age: number;
  image_url: string;
}

const StudentSchema: Schema<IStudent> = new Schema(
  {
    name: { type: String, required: [true, 'Student name is required'] },
    parent_name: { type: String, required: [true, 'Parent name is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    image_url: { type: String, default: '' },
  },
  { timestamps: true }
);

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
