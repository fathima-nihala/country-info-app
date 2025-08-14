import { Routes, Route } from "react-router-dom";
import CountryListPage from "./pages/CountryListPage";
import CountryDetailPage from "./pages/CountryDetailPage";
import './App.css'

export default function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<CountryListPage />} />
        <Route path="/country/:code" element={<CountryDetailPage />} />
      </Routes>
    // </Router>
  );
}
