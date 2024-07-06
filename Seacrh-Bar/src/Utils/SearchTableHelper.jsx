// SearchTableHelpers.jsx

export const handleInputChange = (event, setQuery, setResults) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  
    // Clear results when input is empty
    if (inputValue === '') {
      setResults([]);
    }
  };
  
  export const handleSearch = async (query, limit, fetchCities, setLoading, setResults, setTotalPages) => {
    if (query.trim() === '') {
      alert('Type something to search...');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetchCities(query, limit);
      setResults(response.data);
      setTotalPages(Math.ceil(response.metadata.totalCount / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  export const handleLimitChange = (event, setLimit, alert) => {
    const value = parseInt(event.target.value);
    if (value > 10) {
      alert('Maximum limit is 10');
      setLimit(10);
    } else {
      setLimit(value);
    }
  };
  