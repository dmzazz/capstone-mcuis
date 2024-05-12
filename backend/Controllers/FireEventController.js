import FireEventModel from "../Models/FireEventModel.js";

export const HandleSensorDetection = async (newSensorData) => {
  try {
    // Cek jika sensor flame terdeteksi
    if (newSensorData.fire_level === 1) {
      // Membuat entri FireEvent untuk deteksi api
      await FireEventModel.create({
        location: newSensorData.location,
        event_type: "fire",
        fire_sensor_id: newSensorData.id,
      });
      console.log("Api terdeteksi di sensor:", newSensorData.sensor_name);
    }

    // Cek jika sensor MQ2 mendeteksi asap atau gas
    if (newSensorData.smoke_value > 0) {
      // Membuat entri FireEvent untuk deteksi asap
      await FireEventModel.create({
        location: newSensorData.location,
        event_type: "smoke",
        fire_sensor_id: newSensorData.id,
      });
      console.log("Asap/Gas terdeteksi di sensor:", newSensorData.sensor_name);
    }
  } catch (error) {
    console.error("Error handling sensor detection:", error);
  }
};

//get all fire events

export const getFireEvents = async (req, res) => {
  try {
    const fireEvents = await FireEvent.findAll();
    return res.status(200).json(fireEvents);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
