import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTime = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formattedTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div data-testid="time">{formattedTime()}</div>
      {isRunning ? (
        <button data-testid="pause" onClick={startStop}>
          Pause
        </button>
      ) : (
        <button data-testid="start" onClick={startStop}>
          Start
        </button>
      )}
      <button data-testid="reset" onClick={resetTime} disabled={time === 0 && !isRunning}>
        Reset
      </button>
    </div>
  );
}

export default Stopwatch;
