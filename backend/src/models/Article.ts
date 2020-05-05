import { model, Document, Schema, Types } from 'mongoose';

export interface IArticle extends Document {
    name: string;
    price: number;
    category: Types.ObjectId;
}

const ArticleSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

export default model<IArticle>('Article', ArticleSchema);
