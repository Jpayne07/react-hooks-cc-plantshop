import React from "react";
//one prop for the search state
function Search({setSearchPlantState}) {

  //passing to lowest controlled component
  const searchPlants = (e)=> {
    const searchValue = e.target.value
    setSearchPlantState(searchValue)
   }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={searchPlants}
      />
    </div>
  );
}

export default Search;
