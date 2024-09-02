import React, { useState} from "react";

function PlantCard({plantItem, plantState, setPlantState}) {
  //state initialization, checking instock, new plant price, boolean to hide price form, boolean to hide content client side before refresh
  const [inStock, setStock] = useState(true)
  const [newPrice, setPrice] = useState(plantItem.price)
  const [hidePrice, setHidePrice] = useState(false)
  const [deleted, setDelete] = useState(false)
  const changePrice = (e)=>{
    e.preventDefault()
    //patch fires on event now and not useEffect
    fetch(`http://localhost:6001/plants/${plantItem.id}`,{
      method:'PATCH',
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify({price:parseInt(newPrice)})
    })
    
  }
    
  //function to show price form on price button click
  const updatingPrice = ()=>{
    setHidePrice(!hidePrice)
  }
  //function to delete plant: includes server update and state update to remove content server side
  const deletePlant = ()=>{
    setDelete(true)
      fetch(`http://localhost:6001/plants/${plantItem.id}`,{
        method:'DELETE',
        headers: {
        "Content-Type": "application/json"},
      })
      setPlantState(plantState.filter(plant =>{//this updates plant state based on the delete
        return plant.id !==plantItem.id
      }))
  }
  return (
    deleted?null://ternary to handle the client side remove of deletePlant
    <li className="card" data-testid="plant-item">
      <img src={plantItem.image} alt={plantItem.name} />
      <h4>{plantItem.name}</h4>
      <p>Price: {newPrice}</p>
      <button onClick={updatingPrice}>Update Price</button>

      {hidePrice ?
      <form action="" method="get" onSubmit={e=>changePrice(e)}>
          <label>Change Price: </label>
          <input type="text" placeholder="Enter Price" value ={newPrice} onChange={(e)=>setPrice(e.target.value)}/>
          <button>Submit</button>
      </form>:null}
      <br></br>
  
      {inStock ? (//ternary to handle the inStock functionality
        <button className="primary" onClick={()=>setStock(false)}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button className = 'delete'onClick={deletePlant}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;
