import React from "react";

type CountdownStatus = "active" | "inactive" | "emergency";

function getReturnValues(countDown: number) {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  const status: CountdownStatus =
    days + hours + minutes + seconds <= 0
      ? "inactive"
      : days === 0 && hours === 0 && minutes < 5
        ? "emergency"
        : "active";

  return { days, hours, minutes, seconds, status };
};

export function useCountdown(
  targetDate: string | number | Date,
  duration: number
) {
  const baseCountDownDate = new Date(targetDate);
  baseCountDownDate.setHours(
    baseCountDownDate.getHours() + duration
  );

  const countDownDate = baseCountDownDate.getTime();

  const [countDown, setCountDown] = React.useState(
    countDownDate - new Date().getTime()
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};
