const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const productSchema = new Schema(
    {
        category: { type: String, required: [true, 'Category is required'], trim: true },
        brand: { type: String, required: [true, 'Brand is required'], trim: true },
        title: { type: String, required: [true, 'Title is required'], trim: true },
        imageUrl: {
            type: String,
            required: [true, 'imageUrl is required'],
            validate: {
                validator: (value) =>
                    validator.isURL(value, {
                        protocols: ['http', 'https', 'ftp'],
                        require_tld: true,
                        require_protocol: true,
                    }),
                message: 'Must be a Valid URL',
            },
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            validate: {
                validator: (value) => value > 0,
                message: 'Price must be a positive number',
            },
            trim: true,
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
            validate: {
                validator: (value) => value > 0,
                message: 'Stock must be a positive number',
            },
            trim: true,
        },
        discountPercentage: {
            type: Number,
            required: [true, 'Discount is required'],
            validate: {
                validator: (value) => value >= 0 && value <= 100,
                message: 'Discount must be between 0 and 100',
            },
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [10, 'Description must be at least 10 characters'],
            maxLength: [900, 'Description should not exceed 900 characters'],
            trim: true,
        },
        owner: { type: ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const Product = model('Product', productSchema);

module.exports = Product;
