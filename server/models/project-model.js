const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    status: { 
      type: String, 
      enum: ['open', 'in progress', 'completed'], 
      default: 'open' 
    },
    tags: { 
        type: [String] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});
  
module.exports = mongoose.model('project', projectSchema);