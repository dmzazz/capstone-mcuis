import FireSensorModel from "../Models/FireSensorModel.js";

export const SaveSensorData = async (req, res) => {
  try {
    const { fireValue, smokeValue } = req.body;

    // Check if flame is detected
    const isFlameDetected = fireValue === 1; // Adjust this condition based on your actual data format

    // If flame is detected, save sensor data to database
    if (isFlameDetected) {
      await FireSensorModel.create({
        sensor_name: "sensor fire",
        sensor_type: "temperature",
        fire_level: 1, // Set fire level to 1 when flame is detected
        smoke_value: smokeValue, // You may adjust this based on your actual data
        location: "your_location",
        status: "active",
      });

      res.status(201).json({ message: "Data sensor berhasil disimpan" });
    } else {
      // If flame is not detected, do nothing or send response indicating no data saved
      res.status(200).json({ message: "Tidak ada data sensor yang disimpan" });
    }
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menyimpan data sensor" });
  }
};
