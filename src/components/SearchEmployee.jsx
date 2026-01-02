import { useState } from "react";
import { fetchEmployees } from "../slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../slices/employeeSlice";

function SearchEmployee() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const search = useSelector((state) => state.employees.search);

  const isValidSearch = (value) => {
    const trimmed = value.trim();
    // Allow letters, numbers, spaces, and email characters (@, .)
    const regex = /^[a-zA-Z0-9\s@.]+$/;
    return trimmed.length >= 2 && regex.test(trimmed);
  };

  const handleSearch = () => {
    // if (!searchTerm.trim()) return;
    if (!isValidSearch(search)) {
      setError(
        "Enter at least 2 characters. Only letters, numbers, spaces, '@' and '.' are allowed."
      );
      return;
    }
    setError("");
    dispatch(fetchEmployees(search.trim()));
  };

  return (
    <>
      <div className="flex-auto">
        <input
          type="text"
          className="input focus:outline-none order-1 focus:bg-white"
          placeholder="Search by name, email, department"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <button
          type="submit"
          className="btn btn-success order-2"
          onClick={handleSearch}
        >
          Search
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
}

export default SearchEmployee;
