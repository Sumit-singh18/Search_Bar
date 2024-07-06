import { useRef, useState, useEffect } from "react";
import "./SeachTable.css";
import { ShimmerText } from "react-shimmer-effects";
import { fetchCities } from "../../Api/Api";
import {
  handleInputChange,
  handleSearch,
  handleLimitChange,
} from "../../Utils/SearchTableHelper";

const SearchTable = () => {
  const searchBoxRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // Handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await handleSearch(query, limit, fetchCities, setLoading, setResults, setTotalPages);
  };

  // Handle keyboard shortcut Ctrl/Cmd + / to focus search box
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        searchBoxRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="search-table-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          ref={searchBoxRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e, setQuery, setResults)}
          placeholder="Search for a city..."
          className="search-box"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {loading && <ShimmerText />} {/* Show shimmer effect when loading */}

      {!loading && results.length === 0 && query !== "" && (
        <div>No result found</div>
      )}
      {!loading && query === "" && <div>Start searching</div>}

      {!loading && results.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Place Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result.id}>
                  <td>{index + 1 + (page - 1) * limit}</td>
                  <td>{result.name}</td>
                  <td>
                    <img
                      src={`https://flagsapi.com/${result.countryCode}/flat/32.png`}
                      alt={result.country}
                    />
                    {result.country}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length > 0 && (
        <>
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                disabled={index + 1 === page}
              >
                {index + 1}
              </button>
            ))}
          </div>
        
        </div>
        <div>
        <span>Set Your Page Data Limit</span>
        <input
            type="number"
            value={limit}
            onChange={(e) => handleLimitChange(e, setLimit, alert)}
            min="1"
            max="15"
            className="limit-input"
          />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchTable;
