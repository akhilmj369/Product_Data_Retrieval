import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    const stripHtmlTags = (htmlString) => {
        return htmlString.replace(/<[^>]+>/g, '');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://product-data-retrieval-2.onrender.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h1 className="header">Shopify Products</h1>
            <div className="table-container">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Title</th>
                            <th>Product Description</th>
                            <th>Product Category</th>
                            <th>Product Tags</th>
                            <th>Variant ID</th>
                            <th>Variant Title</th>
                            <th>Variant Price</th>
                            <th>Variant Compared Price</th>
                            <th>Variant SKU</th>
                            <th>Variant Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{stripHtmlTags(product.body_html)}</td>
                                <td>{product.product_type}</td>
                                <td>{product.tags}</td>
                                <td>{product.variants[0].id}</td>
                                <td>{product.variants[0].title}</td>
                                <td>{product.variants[0].price}</td>
                                <td>{product.variants[0].compare_at_price}</td>
                                <td>{product.variants[0].sku}</td>
                                <td>{product.variants[0].inventory_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;