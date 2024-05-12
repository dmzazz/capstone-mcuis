import FireSensorModel from "./models/FireSensorModel.js";
import FireEventModel from "./models/FireEventModel.js";
import NotificationModel from "./models/NotificationModel.js";
import User from "./models/UserModel.js";

exports.handleFireDetection = async (sensorData) => {
  try {
    const newSensorData = await FireSensorModel.create(sensorData);

    if (sensorData.apiValue > sensorThreshold) {
      const newFireEvent = await FireEventModel.create({
        sensorId: newSensorData.id,
        timestamp: newSensorData.timestamp,
      });

      // Kirim notifikasi ke user
      await Notification(newFireEvent);
    }
  } catch (error) {
    console.error("Error handling fire detection:", error);
  }
};

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("path/to/serviceAccountKey.json"),
});

const sendUserPushNotification = async (deviceToken, message) => {
  try {
    // Payload notifikasi push
    const payload = {
      notification: {
        title: "Peringatan Kebakaran",
        body: message,
      },
    };

    // Kirim notifikasi push menggunakan FCM
    await admin.messaging().sendToDevice(deviceToken, payload);
    console.log("Notifikasi push kepada pengguna berhasil dikirim");
  } catch (error) {
    console.error("Error sending push notification to user:", error);
  }
};

const sendFirefighterPushNotification = async (deviceToken, message) => {
  try {
    // Payload notifikasi push
    const payload = {
      notification: {
        title: "Kebakaran Baru",
        body: message,
      },
    };

    await admin.messaging().sendToDevice(deviceToken, payload);
    console.log("Notifikasi push kepada pemadam kebakaran berhasil dikirim");
  } catch (error) {
    console.error("Error sending push notification to firefighter:", error);
  }
};

const sendPushNotifications = async (fireEvent) => {
  try {
    const users = await User.find({});

    for (const user of users) {
      await NotificationModel.create({
        userId: user.id,
        eventId: fireEvent.id,
      });
      // Kirim notifikasi push kepada pengguna
      await sendUserPushNotification(
        user.deviceToken,
        "Ada kebakaran di sekitar Anda!"
      );
    }

    const firefighters = await Firefighter.find({});

    for (const firefighter of firefighters) {
      await sendFirefighterPushNotification(
        firefighter.deviceToken,
        "Ada kebakaran yang perlu ditangani!"
      );
    }
  } catch (error) {
    console.error("Error sending push notifications:", error);
  }
};

sendPushNotifications(fireEvent);
