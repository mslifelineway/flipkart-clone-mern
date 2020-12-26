const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
    },
    slug: {
        type: String,
        required: true, 
        trim: true,
        unique: true,
    },
    categoryImageUrl: {
        type: String
    },
    parentId: {
        type: String,
    }
}, { timeStamps: true});

module.exports = mongoose.model("Categories" , categorySchema);
