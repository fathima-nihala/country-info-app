import { useEffect, useState } from "react";
import type { CountryListItem } from "../types";

interface Props {
  country: CountryListItem;
  onClick: () => void;
}

export default function CountryCard({ country, onClick }: Props) {
  const [localTime, setLocalTime] = useState<string>("");


  useEffect(() => {
  const updateTime = () => {
    try {
      const tz = country.timezones[0]; // e.g., "UTC+01:00"
      if (!tz || !tz.startsWith("UTC")) {
        setLocalTime("N/A");
        return;
      }

      // Parse offset
      const match = tz.match(/UTC([+-])(\d{2}):?(\d{2})?/);
      if (!match) {
        setLocalTime("N/A");
        return;
      }

      const sign = match[1] === "-" ? -1 : 1;
      const hours = parseInt(match[2], 10);
      const minutes = parseInt(match[3] || "0", 10);
      const offsetMinutes = sign * (hours * 60 + minutes);

      const now = new Date();
      const localUTC = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(localUTC + offsetMinutes * 60000);

      setLocalTime(
        local.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    } catch {
      setLocalTime("N/A");
    }
  };

  updateTime();
  const interval = setInterval(updateTime, 60000);
  return () => clearInterval(interval);
}, [country.timezones]);


  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <img src={country.flag} alt={country.name} className="w-20 h-12 object-cover mb-2 rounded" />
      <h3 className="font-bold text-lg text-center">{country.name}</h3>
      <p className="text-gray-600 text-sm">{country.region}</p>
      <p className="text-gray-800 mt-1">{localTime}</p>
    </div>
  );
}
