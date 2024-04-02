import FireSensorModel from "../models/FireSensorModel";

export const saveSensorData = async (req, res) => {
  try {
    const { apiValue, smokeValue, location } = req.body;

    const newSensorData = await FireSensorModel.create({
      apiValue,
      smokeValue,
      location,
    });

    res
      .status(201)
      .json({ message: "Data sensor berhasil disimpan", data: newSensorData });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menyimpan data sensor" });
  }
};
