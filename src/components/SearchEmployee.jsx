import { useState, useEffect } from "react";
import {
  fetchEmployees,
  setSearch,
  resetEmployees,
} from "../slices/employeeSlice";
import { useDispatch } from "react-redux";

function SearchEmployee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const search = useSelector((state) => state.employees.search);

  const isValidSearch = (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) return false;
    // Allow letters, numbers, spaces, and email characters (@, .)
    const regex = /^[a-zA-Z0-9\s@.]+$/;
    return regex.test(trimmed);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchTerm.trim()) return;

      if (!isValidSearch(searchTerm)) {
        setError("Enter at least 2 valid characters.");
        return;
      }

      setError("");
      dispatch(setSearch(searchTerm)); // store in redux
      dispatch(fetchEmployees()); // API call
    }, 500); //debounce time

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setError("");
    dispatch(resetEmployees());
    dispatch(fetchEmployees());
  };

  // const handleSearch = () => {
  //   if (!searchTerm.trim()) return;
  //   if (!isValidSearch(search)) {
  //     setError(
  //       "Enter at least 2 characters. Only letters, numbers, spaces, '@' and '.' are allowed.",
  //     );
  //     return;
  //   }
  //   setError("");
  //   dispatch(fetchEmployees(search.trim()));
  // };

  return (
    <>
      <div className="flex-auto">
        <input
          type="text"
          name="search"
          className="input focus:outline-none order-1 focus:bg-white"
          placeholder="Search by name, email, department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-success order-2"
          onClick={handleClearSearch}
        >
          Clear
        </button>
        {/* <button
          type="submit"
          className="btn btn-success order-2"
          onClick={handleSearch}
        >
          Search
        </button> */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
}

export default SearchEmployee;
