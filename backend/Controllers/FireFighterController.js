import FireFighterModel from "../Models/FireFighterModel.js";
import UserModel from "../Models/UserModel.js";

export const CreateFireFighter = async (req, res) => {
  try {
    const { name, location, status, contact_number, userId } = req.body;
    const newFireFighter = await FireFighterModel.create({
      name,
      location,
      status,
      contact_number,
      userId,
    });
    res.status(201).json({
      message: "Fire fighter added successfully",
      data: newFireFighter,
    });
  } catch (error) {
    console.error("Error adding fire fighter:", error);
    res.status(500).json({ error: "Failed to add fire fighter" });
  }
};

// Controller untuk mendapatkan semua fire fighter
export const GetAllFireFighters = async (req, res) => {
  try {
    const allFireFighters = await FireFighterModel.findAll();
    res.status(200).json(allFireFighters);
  } catch (error) {
    console.error("Error fetching fire fighters:", error);
    res.status(500).json({ error: "Failed to fetch fire fighters" });
  }
};

export const GetFireFighterById = async (req, res) => {
  try {
    const { id } = req.params;
    const fireFighter = await FireFighterModel.findByPk(id);
    if (!fireFighter) {
      return res.status(404).json({ error: "Fire fighter not found" });
    }
    res.status(200).json(fireFighter);
  } catch (error) {
    console.error("Error fetching fire fighter:", error);
    res.status(500).json({ error: "Failed to fetch fire fighter" });
  }
};

export const UpdateFireFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, status, contact_number } = req.body;
    const fireFighter = await FireFighterModel.findByPk(id);
    if (!fireFighter) {
      return res.status(404).json({ error: "Fire fighter not found" });
    }
    await fireFighter.update({ name, location, status, contact_number });
    res.status(200).json({
      message: "Fire fighter updated successfully",
      data: fireFighter,
    });
  } catch (error) {
    console.error("Error updating fire fighter:", error);
    res.status(500).json({ error: "Failed to update fire fighter" });
  }
};

export const DeleteFireFighter = async (req, res) => {
  try {
    const { id } = req.params;
    const fireFighter = await FireFighterModel.findByPk(id);
    if (!fireFighter) {
      return res.status(404).json({ error: "Fire fighter not found" });
    }
    await fireFighter.destroy();
    res.status(200).json({ message: "Fire fighter deleted successfully" });
  } catch (error) {
    console.error("Error deleting fire fighter:", error);
    res.status(500).json({ error: "Failed to delete fire fighter" });
  }
};

export const SendConfirmation = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update confirmation status and timestamps
    user.confirmation_status = "confirmed"; // Menggunakan konfirmasi otomatis
    user.confirmed_at = new Date(); // Set confirmed timestamp
    user.confirmation_updated_at = new Date(); // Set confirmation updated timestamp

    // Save the user details
    await user.save();

    return res.status(200).json({ message: "Confirmation sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation:", error);
    return res.status(500).json({ error: "Failed to send confirmation" });
  }
};

//get notification message from database firefighter

export const GetNotificationMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const fireFighter = await FireFighterModel.findByPk(id);
    if (!fireFighter) {
      return res.status(404).json({ error: "Fire fighter not found" });
    }
    res.status(200).json({ notification_message: fireFighter.notification_message, updatedAt: fireFighter.updatedAt });
  } catch (error) {
    console.error("Error fetching fire fighter:", error);
    res.status(500).json({ error: "Failed to fetch fire fighter" });
  }
};
