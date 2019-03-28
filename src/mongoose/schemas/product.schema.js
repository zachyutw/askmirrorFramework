import mongoose from 'mongoose';
const { Schema } = mongoose;
import imageSchema from './image.schema';
export const collection = 'Product';
export const ProductSchema = Schema(
    {
        name: { type: String, required: true },
        category: { type: String, index: true, default: 'default' },
        price: { type: Number, default: 0 },
        brand: { type: String },
        weight: { type: Number },
        desc: { type: String, default: 'We are building more contents for our products' },
        supplier: { type: String, default: 'JSislandClan' },
        useageCount: { type: String, default: 1 },
        unitPrice: { type: Number, default: 0 },
        unitGroupNumber: { type: Number, default: 1 },
        grade: { type: Number, default: 1 },
        marketPrice: { type: Number },
        inventoryCount: { type: Number, default: 9999 },
        image: imageSchema
    },
    { collection: collection, timestamps: true }
);

export default ProductSchema;
