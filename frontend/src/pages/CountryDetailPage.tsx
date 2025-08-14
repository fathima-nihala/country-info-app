
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

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!country) return <p className="p-6 text-red-500">Country not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      <div className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0">
            <img
              src={country.flag}
              alt={country.name}
              className="w-full md:w-64 h-48 md:h-full object-cover"
            />
          </div>

          <div className="p-6 flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-gray-800">
              {country.officialName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              <p>
                <span className="font-semibold text-gray-700">Capital:</span>{" "}
                {country.capital}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Region:</span>{" "}
                {country.region} - {country.subregion}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Area:</span>{" "}
                {country.area.toLocaleString()} km²
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold text-gray-700">Currencies:</span>{" "}
                {country.currencies
                  .map((c) => `${c.name} (${c.symbol})`)
                  .join(", ")}
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold text-gray-700">Languages:</span>{" "}
                {country.languages.join(", ")}
              </p>
            </div>

            <div className="mt-4">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
