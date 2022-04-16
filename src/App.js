import React from 'react';
import { useState, useEffect } from 'react';
import { Products, Checkout } from './components';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import Cart from './components/Cart/Cart';
import { commerce } from './lib/commerce';
import { Routes, Route } from 'react-router-dom';
import { createContext } from 'react';

const CartActions = createContext();

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };
    const fetchCart = async () => {
        const res = await commerce.cart.retrieve();
        setCart(res);
    };
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    };
    const handleRemoveProduct = async (line_item_id) => {
        const res = await commerce.cart.remove(line_item_id);
        setCart(res.cart);
    };
    const handleIncreaseProduct = async (line_items_id, preQuantity) => {
        const res = await commerce.cart.update(line_items_id, {
            quantity: preQuantity + 1,
        });
        setCart(res.cart);
    };
    const handleDecreaseProduct = async (line_items_id, preQuantity) => {
        const res = await commerce.cart.update(line_items_id, {
            quantity: preQuantity - 1,
        });
        setCart(res.cart);
    };
    const handleEmptyCart = async () => {
        const res = await commerce.cart.empty();
        setCart(res.cart);
    };
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    
          setOrder(incomingOrder);
    
          refreshCart();
        } catch (error) {
          setErrorMessage(error.data.error.message);
        }
      };


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const cartActions = {
        handleRemoveProduct: handleRemoveProduct,
        handleIncreaseProduct: handleIncreaseProduct,
        handleDecreaseProduct: handleDecreaseProduct,
    };

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Products
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <CartActions.Provider value={cartActions}>
                            <Cart
                                cart={cart}
                                handleEmptyCart={handleEmptyCart}
                            />
                        </CartActions.Provider>
                    }
                />
                <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}    />} />
            </Routes>
        </div>
    );
}
export default App;
export { CartActions };
