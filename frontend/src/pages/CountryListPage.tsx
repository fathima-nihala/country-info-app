import { useEffect, useState } from "react";
import { fetchCountries, searchCountries } from "../services/api";
import type { CountryListItem } from "../types"; 
import CountryCard from "../components/CountryCard";
import { useNavigate } from "react-router-dom";

export default function CountryListPage() {
  const [countries, setCountries] = useState<CountryListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, region, query]);

  const loadCountries = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res =
        query || region
          ? await searchCountries(query, region, undefined, page, 20)
          : await fetchCountries(page, 20);

      if (page === 1) {
        setCountries(res.data ?? []);
      } else {
        setCountries((prev) => [...prev, ...(res.data ?? [])]);
      }
      setHasMore(res.pagination?.hasMore ?? false);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antarctic</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard
            key={country.code}
            country={country}
            onClick={() => navigate(`/country/${country.code}`)}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
