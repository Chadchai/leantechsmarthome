import React, { useState } from 'react';
import axios from 'axios';

const TuyaSwitchControl = () => {
  const [switchState, setSwitchState] = useState(false);
  const [loading, setLoading] = useState(false);

  // Replace with your Tuya API credentials
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  const accessToken = 'YOUR_ACCESS_TOKEN';
  const deviceId = 'YOUR_DEVICE_ID'; // The ID of your Tuya switch device

  const toggleSwitch = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://openapi.tuyacn.com/v1.0/iot-03/devices/' + deviceId + '/commands',
        {
          commands: [
            {
              code: 'switch_led',
              value: switchState ? false : true,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'client_id': clientId,
            'client_secret': clientSecret,
            'access_token': accessToken,
          },
        }
      );

      // Check the response and update the switch state
      if (response.data.success) {
        setSwitchState(!switchState);
      } else {
        console.error('Failed to toggle switch:', response.data);
      }
    } catch (error) {
      console.error('Error toggling switch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Tuya Switch Control</h1>
      <p>Switch State: {switchState ? 'On' : 'Off'}</p>

      <button onClick={toggleSwitch} disabled={loading}>
        {loading ? 'Loading...' : 'Toggle Switch'}
      </button>
    </div>
  );
};

export default TuyaSwitchControl;
