import FireEventModel from "../Models/FireEventModel.js";
import FireSensorModel from "../Models/FireSensorModel.js";

export const createFireEvent = async (req, res) => {
  try {
    const { flameValue, mq2Value } = req.body;

    // Cek kondisi sensor untuk menentukan jenis event
    let eventType = "";
    if (flameValue == LOW) {
      eventType = "fire";
    } else if (mq2Value > 550) {
      eventType = "smoke";
    }

    // Cari id sensor terakhir
    const lastSensor = await FireSensorModel.findOne({
      order: [["createdAt", "DESC"]],
    });
    const sensorId = lastSensor ? lastSensor.id : null;

    const newFireEvent = await FireEventModel.create({
      location: "",
      event_type: eventType,
      fire_sensor_id: sensorId,
    });

    res
      .status(201)
      .json({ message: "Fire event created successfully", data: newFireEvent });
  } catch (error) {
    console.error("Error creating fire event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating fire event" });
  }
};
