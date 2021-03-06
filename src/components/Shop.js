import React from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from './product/product'
import Cart from './Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products,setProducts]= useState([]);
    const [cart, setCart]= useState([]);

    useEffect(()=>{
        fetch('https://aqueous-ridge-39879.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    useEffect(()=>{
        const savedCart= getDatabaseCart();
        const productKeys= Object.keys(savedCart);
        fetch('https://aqueous-ridge-39879.herokuapp.com/productsByKeys',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(productKeys)
            })
            .then(res => res.json())
            .then(data =>setCart(data))
    },[])

    const handleAddProduct = (product) =>{
        //console.log("Product Added",product)
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key == toBeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct){
            count =sameProduct.quantity+1;
            sameProduct.quantity+=count;
            product.quantity = sameProduct.quantity;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else
        {
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        console.log(newCart);
        
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    
                    products.map(pd => <Product 
                        key = {pd.key} 
                        showAddToCart={true} 
                        product={pd}
                        handleAddProduct = {handleAddProduct}
                    ></Product>)
                }
            </div>
            <div className="cart-container fixed-right">
                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review order</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;