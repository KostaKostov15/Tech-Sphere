const Product = require('../models/Product');

async function getAll() {
    return Product.find({}).sort({ createdAt: -1 });
}

async function getLatest() {
    return Product.find().sort({ createdAt: -1 }).limit(2);
}

async function getById(id) {
    return Product.findById(id).populate('owner').lean();
}

async function getAllByUserId(userId) {
    return Product.find({ owner: userId }).populate('owner').sort({ createdAt: -1 });
}

async function getByQuery(query) {
    return Product.find(query).sort({ createdAt: -1 });
}

async function create(data) {
    return Product.create(data);
}

async function update(id, data) {
    const existing = await Product.findById(id);

    existing.category = data.category;
    existing.brand = data.brand;
    existing.title = data.title;
    existing.imageUrl = data.imageUrl;
    existing.price = data.price;
    existing.stock = data.stock;
    existing.discount = data.discount;
    existing.description = data.description;

    await existing.save();

    return await getById(id);
}

async function deleteById(id) {
    return Product.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    getAllByUserId,
    getLatest,
    getByQuery,
    create,
    update,
    deleteById,
};
