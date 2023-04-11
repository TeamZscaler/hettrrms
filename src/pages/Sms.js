import React, { useState } from "react";
import axios from 'axios';

const Sms = ({ phoneNumber }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('/accept', { phoneNumber });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error accepting request');
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleAccept} disabled={isLoading}>
      {isLoading ? 'Accepting...' : 'Accept'}
      {error && <p>{error}</p>}
    </button>
  );
}

export default Sms