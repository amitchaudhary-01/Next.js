import Settings from "../schema/setting.js";

// Get system settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // Create default record if none exists yet
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update system settings
export const updateSettings = async (req, res) => {
  try {
    const { siteName, adminEmail, maintenanceMode, emailAlerts, twoFactorAuth, sessionTimeout } = req.body;

    const updatedSettings = await Settings.findOneAndUpdate(
      {}, 
      { siteName, adminEmail, maintenanceMode, emailAlerts, twoFactorAuth, sessionTimeout },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Settings updated successfully', 
      settings: updatedSettings 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};