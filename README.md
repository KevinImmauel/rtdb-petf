# Realtime Pet Feeder and Activity Tracker System

## Overview
This project is a React-based web application integrated with Firebase Realtime Database to track pet activities and feeding status in real-time. It monitors pet movements, feeding patterns, and activity levels using sensors and updates the data dynamically with Firebase.

---

## Features
- **Pet Activity Monitoring**: Tracks if the pet is resting or moving using an ADXL345 sensor.
- **Location Tracking**: Determines if the pet is within the home perimeter using Wi-Fi signal strength.
- **Feeding Tracking**: Monitors how much food is left in the bowl and records feeding times.
- **Dynamic GIF Updates**: Automatically displays GIF animations to visualize real-time activity changes.
- **Firebase Integration**: Stores and retrieves data in real-time for seamless updates.

---

### Screenshots
![Uploading {318E418A-83E3-4841-AB46-1E7ABBB81CBE}.png…]()
- Pet resting detection with sensor data.
- Location tracking using Wi-Fi signal strength.
- Food level monitoring based on bowl weight.

---

## Requirements
- React.js
- Firebase Realtime Database
- Arduino Sensors (ADXL345 for motion, Wi-Fi signal for location, and weight sensors for feeding tracking)

### Install Dependencies
```bash
npm install firebase react-bootstrap
```

---

## Firebase Configuration
1. Create a Firebase project and enable Realtime Database.
2. Replace the Firebase configuration in the app with your project settings.
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## Running the Application
1. Start the React app:
```bash
npm start
```
2. Access the web app at:
```
http://localhost:3000
```
3. Deploy the app online using Firebase Hosting or Vercel if required.

---

## Results
- Displays pet activity status in real-time.
- Tracks feeding and movement with sensor updates.
- Dynamic visual changes using GIFs based on activity.

---

## Notes
- Ensure all sensors are calibrated and connected properly.
- Update Firebase rules for secure data handling.
- Test Wi-Fi signal strength detection for perimeter tracking.

---

## License
This project is licensed under the MIT License.

