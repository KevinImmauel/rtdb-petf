import React, { useEffect, useState, useRef } from 'react';
import { database } from '../firebase'; // Adjust the path if needed
import { ref, onValue, off } from "firebase/database";

const Read = () => {
  const [data, setData] = useState({
    acceleration: { x: null, y: null, z: null },
    test: { float: null, int: null },
    catStatus: 'Unknown',
    restDuration: 0,
    moveDuration: 0,
    wifiStrength: null,
    bowlWeight: null // Add bowlWeight to the state
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lastStatusChangeTime = useRef(new Date());
  const lastStatus = useRef('Unknown');

  const determineCatStatus = (acceleration) => {
    const threshold = 13.0;
    const { x, y, z } = acceleration;
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    return magnitude < threshold ? 'Resting' : 'Moving around';
  };

  const updateDurations = (newStatus) => {
    const now = new Date();
    const elapsed = (now - lastStatusChangeTime.current) / 1000; // elapsed time in seconds
    if (lastStatus.current === 'Resting') {
      setData(prevData => ({
        ...prevData,
        restDuration: prevData.restDuration + elapsed
      }));
    } else if (lastStatus.current === 'Moving around') {
      setData(prevData => ({
        ...prevData,
        moveDuration: prevData.moveDuration + elapsed
      }));
    }
    lastStatusChangeTime.current = now;
    lastStatus.current = newStatus;
  };

  useEffect(() => {
    const accRef = ref(database, 'acceleration');
    const wifiRef = ref(database, 'wifiStrength');
    const testRef = ref(database, 'test');
    const bowlWeightRef = ref(database, 'test/bowlWeight'); // Reference for bowlWeight

    const unsubscribeAcc = onValue(
      accRef,
      (snapshot) => {
        const acceleration = snapshot.val();
        const newStatus = determineCatStatus(acceleration);
        updateDurations(newStatus);
        setData(prevData => ({
          ...prevData,
          acceleration,
          catStatus: newStatus
        }));
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    const unsubscribeWifi = onValue(
      wifiRef,
      (snapshot) => {
        const wifiStrength = snapshot.val();
        setData(prevData => ({
          ...prevData,
          wifiStrength
        }));
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    const unsubscribeTest = onValue(
      testRef,
      (snapshot) => {
        setData(prevData => ({
          ...prevData,
          test: snapshot.val()
        }));
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    const unsubscribeBowlWeight = onValue(
      bowlWeightRef,
      (snapshot) => {
        const bowlWeight = snapshot.val();
        setData(prevData => ({
          ...prevData,
          bowlWeight
        }));
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    // Reset daily durations at midnight
    const resetDailyDurations = () => {
      setData(prevData => ({
        ...prevData,
        restDuration: 0,
        moveDuration: 0
      }));
    };

    const now = new Date();
    const msUntilMidnight = (
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now
    );

    const midnightTimeout = setTimeout(() => {
      resetDailyDurations();
    }, msUntilMidnight);

    // Cleanup subscriptions and timeouts on unmount
    return () => {
      off(accRef);
      off(wifiRef);
      off(testRef);
      off(bowlWeightRef);
      unsubscribeAcc();
      unsubscribeWifi();
      unsubscribeTest();
      unsubscribeBowlWeight();
      clearTimeout(midnightTimeout);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  const wifiStatusMessage = () => {
    if (data.wifiStrength < -80) {
      return "Pet is away";
    } else {
      return "Pet is inside house perimeter";
    }
  };

  return (
    <div>
      <h1>Data from Firebase</h1>
      <div>
        <h2>Acceleration</h2>
        <p>X: {data.acceleration.x}</p>
        <p>Y: {data.acceleration.y}</p>
        <p>Z: {data.acceleration.z}</p>
        <p>Magnitude: {Math.sqrt(data.acceleration.x * data.acceleration.x + 
                                 data.acceleration.y * data.acceleration.y + 
                                 data.acceleration.z * data.acceleration.z)}</p>
        <p>Status: {data.catStatus}</p>
        <p>Resting Time: {formatTime(data.restDuration)}</p>
        <p>Moving Time: {formatTime(data.moveDuration)}</p>
      </div>
      <div>
        <h2>Test</h2>
        <p>Float: {data.test.float}</p>
        <p>Int: {data.test.int}</p>
      </div>
      <div>
        <h2>Wi-Fi Strength</h2>
        <p>{data.wifiStrength}</p>
        <p>{wifiStatusMessage()}</p>
      </div>
      <div>
        <h2>Bowl Weight</h2> {/* Section for bowl weight */}
        <p>{data.bowlWeight !== null ? `${data.bowlWeight} kg` : 'No data available'}</p>
      </div>
    </div>
  );
};

export default Read;
