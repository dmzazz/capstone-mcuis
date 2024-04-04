import FireSensorModel from "../Models/FireSensorModel.js";

export const SaveSensorData = async (req, res) => {
  try {
    const { sensor_name, sensor_type, fire_value, smoke_value, location } =
      req.body;

    const newSensorData = await FireSensorModel.create({
      sensor_name,
      sensor_type,
      fire_value,
      smoke_value,
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
