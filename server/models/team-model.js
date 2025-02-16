const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { 
        type: String, 
        required: true 
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
  
module.exports = mongoose.model('team', teamSchema);  