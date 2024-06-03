import React, { useEffect, useState, useRef } from 'react';
import { database } from '../firebase'; // Adjust the path if needed
import { ref, onValue, off } from "firebase/database";
import Header from './Header';
import Card from './Card';
import List from './List';
import Footer from './Footer';
import SimpleCard from './SimpleCard';
import SimpleCard2 from './SimpleCard2';

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
      <Header></Header>
      <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-3'>
      <div>
      <Card img1={'https://i.pinimg.com/originals/a4/62/4d/a4624d5a0839a2817eaabd1dec2c518c.gif'} img2={'https://i.postimg.cc/YGxLXDv7/eepyCar2.jpg'} name={"Cat is " + data.catStatus}
                                      des={"Determines if the Cat is resting or moving around using ADXL345 sensor."}></Card>
      <List a={'Acceleration Magnitude'} b={Math.sqrt(data.acceleration.x * data.acceleration.x + 
                                 data.acceleration.y * data.acceleration.y + 
                                 data.acceleration.z * data.acceleration.z)} c={'Acceleration'} d={'X'+" "+data.acceleration.x + ',' + 'Y'+" "+data.acceleration.y + ',' + 'Z'+" "+data.acceleration.z}
                                 e={'Resting Time'} f={formatTime(data.restDuration)} g={'Moving Time'} h={formatTime(data.moveDuration)}></List>
      </div>
      <div>
      <SimpleCard2 img={'https://i.postimg.cc/5HLCz216/speed-Cat2.jpg'} name={'Where is my Cat?'} des={"Determines if the Cat is moving far away from home perimeter or is in range using WiFi Signal Strength."} wifiStatusMessage={wifiStatusMessage()} img2={"https://media.tenor.com/MSEHyb7uNi8AAAAC/cat-driving.gif"}></SimpleCard2>
      <List a={'Wifi signal Strength'} b={data.wifiStrength} c={'Cat Status'} d={wifiStatusMessage()}></List>
      </div>
      <div>
      <SimpleCard2 img={'https://i.postimg.cc/cJJWTL2N/fatcar2.jpg'} name={'How much is left in the Bowl?'} des={"Determines how much that cat has eaten off the bowl since the last feed."} wifiStatusMessage={data.bowlWeight !== null ? `${data.bowlWeight} g` : 'No data available'} img2={"https://i.pinimg.com/originals/b6/d2/df/b6d2df289c41eed4569130980bf4b0ea.gif"}></SimpleCard2>
      <List a={'Bowl Weight'} b={data.bowlWeight !== null ? `${data.bowlWeight} g` : 'No data available'}></List>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Read;
