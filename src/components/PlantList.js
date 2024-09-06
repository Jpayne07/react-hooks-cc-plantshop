import React from "react";
import PlantCard from "./PlantCard";
//rendering all of the plants with their final card layouts
function PlantList({filteredPlants, setPlantState, handleDelete, updatingPrice, hidePrice}) {

  //mapping the plant state array to a variable
  const plantList = filteredPlants.map(plant=>{
    return <PlantCard plantItem = {plant} 
    key ={plant.id} 
    filteredPlants={filteredPlants} 
    setPlantState={setPlantState} 
    handleDelete = {handleDelete} 
    updatingPrice = {updatingPrice} 
    hidePrice={hidePrice}
    />
  })
  return (
    <ul className="cards">{plantList}</ul>
  );
}

export default PlantList;
