import React from "react";
import PlantCard from "./PlantCard";
//rendering all of the plants with their final card layouts
function PlantList({plantState}) {
  console.log(plantState)
  //mapping the plant state array to a variable
  const plantList = plantState.map(plant=>{
    return <PlantCard plantItem = {plant} key ={plant.id}/>
  })
  return (
    <ul className="cards">{plantList}</ul>
  );
}

export default PlantList;
