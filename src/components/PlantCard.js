import React, { useState} from "react";

function PlantCard({plantItem, handleDelete, updatingPrice, setPlantState}) {
  //state initialization, checking instock, new plant price, boolean to hide price form, boolean to hide content client side before refresh
  const [inStock, setStock] = useState(true)
  const [newPrice, setPrice] = useState(plantItem.price)
  const [submitPrice, setSubmitPrice]=useState(plantItem.price)
  
  const changePrice = (e)=>{
    e.preventDefault()
    //patch fires on event now and not useEffect
    fetch(`http://localhost:6001/plants/${plantItem.id}`,{
      method:'PATCH',
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify({price:parseInt(newPrice)})
    })
    .then(r=>r.json())
    .then((updatedPlant)=>{
      setSubmitPrice(newPrice)

      setPlantState((prevPlantState) =>
        prevPlantState.map((plant) =>
          plant.id === updatedPlant.id
            ? { ...plant, price: updatedPlant.price }
            : plant
        )
      );
    })
  }
    
 
  //function to delete plant: includes server update and state update to remove content server side
  
  return (
    <li className="card" data-testid="plant-item">
      <img src={plantItem.image} alt={plantItem.name} />
      <h4>{plantItem.name}</h4>
      <p>Price: {submitPrice} </p>
      <button onClick={updatingPrice}>Update Price</button>

  
      <form onSubmit={changePrice}>
          <label>Change Price: </label>
          <input type="text" placeholder="Enter Price" value ={newPrice} onChange={(e)=>setPrice(e.target.value)}/>
          <button>Submit</button>
      </form>
      <br></br>
  
      {inStock ? (//ternary to handle the inStock functionality
        <button className="primary" onClick={()=>setStock(false)}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button className = 'delete' onClick={()=>handleDelete(plantItem.id)}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;
