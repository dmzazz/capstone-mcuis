import FireSensorModel from "../Models/FireSensorModel.js";
import { HandleSensorDetection } from "../Controllers/FireEventController.js";

export const SaveSensorData = async (req, res) => {
  try {
    const { sensor_name, sensor_type, fire_level, smoke_value, location } =
      req.body;

    const newSensorData = await FireSensorModel.create({
      sensor_name,
      sensor_type,
      fire_level,
      smoke_value,
      location,
      status: "active",
    });

    // Memanggil fungsi HandleSensorDetection dengan data sensor yang baru disimpan
    await HandleSensorDetection(newSensorData);

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

//get all sensors

export const getAllSensors = async (req, res) => {
  try {
    const sensors = await FireSensorModel.findAll();
    return res.status(200).json(sensors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
