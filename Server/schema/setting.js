import mongoose from 'mongoose';


const settingsSchema = new mongoose.Schema({

  siteName: { 
    type: String, 
    required: true, 
    default: 'Veedoo Admin' },

  adminEmail: { 
    type: String, 
    required: true, 
    default: 'ac984939@gmail.com' },

  maintenanceMode: { 
    type: Boolean, 
    default: false },

  emailAlerts: { 
    type: Boolean, 
    default: true },

  twoFactorAuth: { 
    type: Boolean, 
    default: true },

  sessionTimeout: { 
    type: String, 
    default: '30' }

}, { 
    timestamps: true 
});

const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
export default Settings