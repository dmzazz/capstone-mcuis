import FireFighterModel from "../Models/FireFighterModel.js";

export const CreateFireFighter = async (req, res) => {
  try {
    const { name, location, status, contact_number } = req.body;
    const newFireFighter = await FireFighterModel.create({
      name,
      location,
      status,
      contact_number,
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
