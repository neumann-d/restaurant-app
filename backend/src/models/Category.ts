import { model, Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
}

const CategorySchema= new Schema({
    name: {type: Schema.Types.String, required: true}
});

export default model<ICategory>('Category', CategorySchema);
