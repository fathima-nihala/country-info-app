import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryDetail } from "../services/api";
import type { CountryDetail } from "../types";

export default function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    (async () => {
      try {
        const res = await fetchCountryDetail(code);
        setCountry(res.data ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!country) return <p className="p-4">Country not found.</p>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500">← Back</Link>
      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <img src={country.flag} alt={country.name} className="w-48 h-32 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold">{country.officialName}</h2>
          <p>Capital: {country.capital}</p>
          <p>Region: {country.region} - {country.subregion}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Area: {country.area.toLocaleString()} km²</p>
          <p>Currencies: {country.currencies.map(c => `${c.name} (${c.symbol})`).join(", ")}</p>
          <p>Languages: {country.languages.join(", ")}</p>
          <div className="mt-2">
            <a href={country.maps.googleMaps} target="_blank" rel="noreferrer" className="text-blue-600 underline">Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  );
}
