import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    
    // Optional: If needed multiple images for a gallery view
    images: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    beds: {
        type: Number,
        required: true,
        default: 0
    },
    baths: {
        type: Number,
        required: true,
        default: 0
    },
    sqft: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['For Sale', 'For Lease', 'For Rent'],
        required: true
    }
}, { timestamps: true }) // Adds createdAt and updatedAt fields automatically

export const Room = mongoose.model("Room", roomSchema)