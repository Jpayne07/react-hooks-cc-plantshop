import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //state initialized here because the form and the plant list use these states
  const [plantState, setPlantState] = useState([])
  const [searchPlantState, setSearchPlantState] = useState('')
  const [deleted, setDelete] = useState(false)
  const [hidePrice, setHidePrice] = useState(false)


  const API = ('http://localhost:6001/plants')
  //calling our data and setting our state
  useEffect(()=>{
    fetch(API)
    .then(r=>r.json())
    .then(data=>{
      setPlantState(data)
      
    })
  },[])


  const deletePlant = (plantId)=>{
    setDelete(true)
      fetch(`http://localhost:6001/plants/${plantId}`,{
        method:'DELETE',
        headers: {
        "Content-Type": "application/json"},
      })
      .then(()=>setPlantState(plantState.filter(plant =>{//this updates plant state based on the delete
        return plant.id !==plantId
      }))
      
    )
      
  }
 
  
  //setting a varaible to hold the search filtered plants
  const filterablePlants = plantState.filter(plant=>{
    return plant.name.toLowerCase().includes(searchPlantState.toLowerCase())
  })

console.log(plantState)

 //function to show price form on price button click
 const updatingPrice = ()=>{
  setHidePrice(!hidePrice)
}
  
  //rendered content below with the required props
  return (
    <main>
      <NewPlantForm API = {API} setPlantState={setPlantState} plantState={plantState}/>
      <Search  setSearchPlantState ={setSearchPlantState} searchPlantState = {searchPlantState}/>
      <PlantList filteredPlants={filterablePlants} 
      setPlantState={setPlantState} 
      handleDelete = {deletePlant} 
      deleteState = {deleted}
      updatingPrice={updatingPrice}
      hidePrice={hidePrice}
      />
    </main>
  );
}

export default PlantPage;
