const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This is required'
    },
    description: {
        type: String,
        required: 'This is required'
    },
    author: {
        type: String,
        required: 'This is required'
    },
    content: {
        type: String,
        required: 'This is required'
    },
    category: {
        type: String,
        enum: ['Drone', 'Photos', 'Video', 'Livestream', 'Polariod', 'Filming'],
        required: 'This is required'
    },
    image: {
        type: String,
        required: 'This is required'
    }
});

blogSchema.index({ name: 'text', description: 'text'} );
// Wildcard 
// blogSchema.index({ "$**" : 'text'} );

module.exports = mongoose.model('Blog', blogSchema);