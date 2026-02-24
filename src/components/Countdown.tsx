import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // ISO or parseable date string
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Jours", value: timeLeft.days },
    { label: "Heures", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  if (timeLeft.total <= 0) {
    return (
      <p className="text-primary font-display font-bold text-lg mt-6">
        🎉 L'événement a commencé !
      </p>
    );
  }

  return (
    <div className="flex gap-3 mt-6">
      {units.map((u) => (
        <div
          key={u.label}
          className="glass-card rounded-lg px-4 py-3 text-center min-w-[70px]"
        >
          <span className="text-2xl sm:text-3xl font-display font-bold text-primary">
            {String(u.value).padStart(2, "0")}
          </span>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
            {u.label}
          </p>
        </div>
      ))}
    </div>
  );
};

function getTimeLeft(target: string) {
  const total = new Date(target).getTime() - Date.now();
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default Countdown;
