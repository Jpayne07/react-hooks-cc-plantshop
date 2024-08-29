import React, {useState} from "react";

function NewPlantForm({ API, setPlantState, plantState}) {
  //add plant is the only prop that triggers the function when the form is submitted

  const [newPlantName, setPlantNameState] = useState('')
  const [newPlantImage, setPlantImageState] = useState('')
  const [newPriceName, setNewPriceName] = useState('')

  //updated to update based on the handleNewPlantSubmit
  function handleNewPlant(e){
    e.preventDefault()
    const newPlant =
    {
      name: newPlantName||"no plant name entered",
      image: newPlantImage||"no plant image entered",
      price: newPriceName||"no plant price entered"
    }
    setPlantState([...plantState,newPlant])
    //id handled by post
    fetch(API, {
      method:'POST',
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify(newPlant)
    })
  }
  
    


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={(e) => handleNewPlant(e)}>
        <input type="text" name="name" placeholder="Plant name" value={newPlantName} onChange = {(e) => setPlantNameState(e.target.value)}/>{/* adding controlled form functionality*/}
        <input type="text" name="image" placeholder="Image URL" value = {newPlantImage} onChange = {(e) => setPlantImageState(e.target.value)}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value = {newPriceName} onChange = {(e) => setNewPriceName(e.target.value)}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
