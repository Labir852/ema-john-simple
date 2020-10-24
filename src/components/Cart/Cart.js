import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let index = 0; index < cart.length; index++) {
        const product = cart[index];
        total = total+product.price*(product.quantity || 1);
    } 

    let shipping = 0;
    if(total > 35)
    {
        shipping = 0;
    }
    else if(total>15)
    {
        shipping = 4.99;
    }
    else if(total>0)
    {
        shipping = 12.99;
    }

const tax = (total / 10);
const grandTotal = (total+shipping+Number(tax));
const formatNumber = num =>{
    const precision = num.toFixed(2);
    return Number(precision);
}

    return (
        <div>
            <h4>Order Summary</h4>
    <p>Item Ordered: {cart.length}</p>
    <p>Product Price: {formatNumber(total)}</p>
    <p>Shipping Cost: {shipping}</p>
    <p><small>Tax + VAT: {formatNumber(tax)}</small></p>
    <p>Total Price: {formatNumber(grandTotal)}</p>
    <br/>
    {
        props.children
    }
        </div>
    );
};

export default Cart;