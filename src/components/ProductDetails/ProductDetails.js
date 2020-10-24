import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../product/product';

const ProductDetails = () => {
    const {productkey} =  useParams();
    const [product,setProduct] = useState({});

    useEffect(()=>{
        fetch('http://localhost:5000/products/'+productkey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[productkey])
    return (
        <div>
            <h1> Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;