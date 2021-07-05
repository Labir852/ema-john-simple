import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};
    fetch('https://aqueous-ridge-39879.herokuapp.com/addOrder',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('your order placed successfully');
      }
    })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="Name" placeholder="Name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
      {errors.Name && <span className="error">Name is required</span>}
      
      <input name="email" placeholder="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
      {errors.email && <span className="error">Email is required</span>}
      
      <input name="address" placeholder="Address" defaultValue={loggedInUser.address} ref={register({ required: true })} />
      {errors.address && <span className="error">Address is required</span>}

      <input name="PhoneNo" placeholder="Phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} />
      {errors.PhoneNo && <span className="error">Phone Number is required</span>}

      
      <input type="submit" />
    </form>
  );
};

export default Shipment;