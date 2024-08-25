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
  //logic for the plant form add
  //doing this here instead of the cumbersome task of carrying down more state items to the plantForm component
  //I only have to pass a prop of this function instead of the plant state and set plant state
  const addPlant = (e) =>{
    e.preventDefault()
    const newPlant =
    {id: plantState.length+1,
      name: e.target.name.value||"no plant name entered",
      image: e.target.image.value||"no plant image entered",
      price: e.target.price.value||"no plant price entered"
    }
    //splitting the array and appending the new plant to the end
    setPlantState([...plantState,newPlant])
    fetch(API, {
      method:'POST',
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify(newPlant)
    })
    
  }
  //search functionality begins
  const searchPlants = (e)=> {
   const searchValue = e.target.value
   setSearchPlantState(searchValue)
  }
  //setting a varaible to hold the search filtered plants
  const filterablePlants = plantState.filter(plant=>{
    return plant.name.toLowerCase().includes(searchPlantState.toLowerCase())
  })
  //rendered content below with the required props
  return (
    <main>
      <NewPlantForm addPlant={addPlant}/>
      <Search searchPlants={searchPlants}/>
      <PlantList plantState={filterablePlants}/>
    </main>
  );
}

export default PlantPage;
