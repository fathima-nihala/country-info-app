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
        const formatter = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: country.timezones[0] || "UTC",
        });
        setLocalTime(formatter.format(new Date()));
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
