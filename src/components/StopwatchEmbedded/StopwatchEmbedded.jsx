import React, { useEffect, useState } from "react";

function StopwatchEmbedded() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;
    if(isRunning) {
      timerId = setInterval(() => {   // In the useEffect hook, we use setInterval to increment the time every second i.e, 1000 ms. 
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => {    // This cleanup function is to abort the previous timer
      clearInterval(timerId);   // The clearInterval function is returned in the cleanup function to stop the interval when the component unmounts. 
    }
  }, [isRunning]);    
  
  // we can use setTimeout() but add the timer also in dependency array. Also it will run the whole thing inside useEffect again and again for each render. But setInterval() runs only the setTimer line again and again. 

  // What is difference between setTimeout and setInterval?
  // setTimeout schedules a single execution after a specified delay, while setInterval repeatedly executes a function at every given time-interval. setTimeout is used for one-time delays or scheduling a task in the future, while setInterval is suitable for recurring tasks.

  const formatTime = (secs) => {
    const mins = Math.floor(secs/60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  }

  const reset = () => {
    setTimer(0);
    setIsRunning(false);
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(timer)}</p>
      <button onClick={startStop}>{isRunning? 'Stop' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default StopwatchEmbedded;