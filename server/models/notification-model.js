const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
  
module.exports = mongoose.model('notification', notificationSchema);  