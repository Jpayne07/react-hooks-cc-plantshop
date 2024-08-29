import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //state initialized here because the form and the plant list use these states
  const [plantState, setPlantState] = useState([])
  const [searchPlantState, setSearchPlantState] = useState('')


  const API = ('http://localhost:6001/plants')
  //calling our data and setting our state
  useEffect(()=>{
    fetch(API)
    .then(r=>r.json())
    .then(data=>setPlantState(data))
  },[])
 
  
  //setting a varaible to hold the search filtered plants
  const filterablePlants = plantState.filter(plant=>{
    return plant.name.toLowerCase().includes(searchPlantState.toLowerCase())
  })

  
  //rendered content below with the required props
  return (
    <main>
      <NewPlantForm API = {API} setPlantState={setPlantState} plantState={plantState}/>
      <Search  setSearchPlantState ={setSearchPlantState}/>
      <PlantList plantState={filterablePlants} setPlantState={setPlantState} />
    </main>
  );
}

export default PlantPage;
