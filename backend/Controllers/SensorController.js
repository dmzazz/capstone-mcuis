import FireSensorModel from "../Models/FireSensorModel.js";
import { HandleSensorDetection } from "../Controllers/FireEventController.js";

export const SaveSensorData = async (req, res) => {
  try {
    const { sensor_name, sensor_type, fire_level, smoke_value, location, status } = req.body;

    const newSensorData = await FireSensorModel.create({
      sensor_name,
      sensor_type,
      fire_level,
      smoke_value,
      location,
      status,
    });

    newSensorData.status = fire_level > 0 ? "Danger" : "Attention";

    // Memanggil fungsi HandleSensorDetection dengan data sensor yang baru disimpan
    await HandleSensorDetection(newSensorData);

    res.status(201).json({
      message: "Data sensor berhasil disimpan",
      data: newSensorData,
      status: newSensorData.status,
    });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menyimpan data sensor" });
  }
};

//get all sensors

export const GetSensorData = async (req, res) => {
  try {
    const sensorData = await FireSensorModel.findAll();

    const sensorDataWithStatus = sensorData.map((sensor) => {
      const status = sensor.fire_level > 0 ? "Danger" : "Attention";
      return {
        id: sensor.id,
        sensor_name: sensor.sensor_name,
        sensor_type: sensor.sensor_type,
        smoke_value: sensor.smoke_value,
        fire_level: sensor.fire_level,
        location: sensor.location,
        createdAt: sensor.createdAt,
        updatedAt: sensor.updatedAt,
        status: status,
      };
    });

    res.status(200).json({
      message: "Data sensor berhasil diambil",
      data: sensorDataWithStatus,
    });
  } catch (error) {
    console.error("Error getting sensor data:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data sensor" });
  }
};
