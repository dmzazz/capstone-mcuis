import DeviceModels from "../models/DeviceModels";

export const DeviceCreate = async (req, res) => {
  const { name, type, status } = req.body;

  try {
    const device = await DeviceModels.create({
      name,
      type,
      status,
    });

    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const Otomation = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await DeviceModels.findByPk(id);
    if (!device) {
      return res.status(404).json({ msg: "Device not found" });
    }
    device.status = device.status === "active" ? "inactive" : "active";
    await device.save();
    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};
