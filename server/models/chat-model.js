const mongoose = require('mongoose');
  
const chatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    messages: [messageSchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const messageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});  
  
module.exports = mongoose.model('chat', chatSchema);