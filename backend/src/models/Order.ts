import { model, Document, Schema, Types } from 'mongoose';

export interface IOrder extends Document {
    items: [
        {
            article: Types.ObjectId;
            quantity: number;
        }
    ];
    total_price: number;
}

const OrderSchema = new Schema({
    items: [
        {
            article: { type: Schema.Types.ObjectId, ref: 'Article' },
            quantity: { type: Schema.Types.Number, required: true }
        }
    ],
    total_price: { type: Schema.Types.Number, required: true }
});

export default model<IOrder>('Order', OrderSchema);
