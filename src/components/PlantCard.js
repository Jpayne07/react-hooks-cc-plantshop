import React, {useEffect, useState} from "react";

function PlantCard({plantItem}) {
  //state initialization, checking instock, new plant price, boolean to hide price form, boolean to hide content client side before refresh
  const [inStock, setStock] = useState(true)
  const [newPrice, setPrice] = useState(plantItem.price)
  const [hidePrice, setHidePrice] = useState(false)
  const [deleted, setDelete] = useState(false)
  const changePrice = (e)=>{
    e.preventDefault()
    setPrice(e.target.name.value)
    
  }
    useEffect(()=>{
    fetch(`http://localhost:6001/plants/${plantItem.id}`,{
      method:'PATCH',
      headers: {
      "Content-Type": "application/json"},
      body: JSON.stringify({price:parseInt(newPrice)})
    })
  },[newPrice, plantItem.id]) //using this dependency so this effect only fires when the plantItem.id, or the newPrice is updated
    
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
          <input type="text" name="name" id="name" placeholder="Enter Price"/>
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
