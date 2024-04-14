import FireSensorModel from "../Models/FireSensorModel.js";
import FireEvent from "../Models/FireEventModel.js";

export const HandleSensorDetection = async () => {
  try {
    // Mendapatkan data dari semua sensor
    const sensors = await FireSensorModel.findAll();

    // Looping untuk setiap sensor
    sensors.forEach(async (sensor) => {
      // Cek jika sensor flame terdeteksi
      if (sensor.fire_value === 1) {
        // Membuat entri FireEvent untuk deteksi api
        await FireEvent.create({
          location: sensor.location,
          event_type: "fire",
          fire_sensor_id: sensor.id,
        });
        console.log("Api terdeteksi di sensor:", sensor.sensor_name);
      }

      // Cek jika sensor MQ2 mendeteksi asap atau gas
      if (sensor.smoke_value > 0) {
        // Membuat entri FireEvent untuk deteksi asap
        await FireEvent.create({
          location: sensor.location,
          event_type: "smoke",
          fire_sensor_id: sensor.id,
        });
        console.log("Asap/Gas terdeteksi di sensor:", sensor.sensor_name);
      }
    });
  } catch (error) {
    console.error("Error handling sensor detection:", error);
  }
};
