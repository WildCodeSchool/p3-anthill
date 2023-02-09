import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="searchBar__form">
      <div className="searchBar__container">
        <BiSearchAlt className="searchBar__icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Recherche"
          className="searchBar__input"
        />
      </div>

      <button type="submit" className="searchBar__button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
