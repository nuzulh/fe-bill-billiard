type CountdownProps = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function Countdown({
  hours,
  minutes,
  seconds,
}: CountdownProps) {
  return (
    <div className="flex">
      <div>
        <p>{`${hours}`.length == 1 ? `0${hours}` : hours}</p>
      </div>
      <p>:</p>
      <div>
        <p>{`${minutes}`.length == 1 ? `0${minutes}` : minutes}</p>
      </div>
      <p>:</p>
      <div>
        <p>{`${seconds}`.length == 1 ? `0${seconds}` : seconds}</p>
      </div>
    </div>
  );
}
