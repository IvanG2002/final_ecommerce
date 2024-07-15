import { useEffect, useState } from "react";
import useCartStore from '../stores/cartStore.js';

function ShoppingList() {
    const coupons = ["dinamita", "beast", "hxh", "naruto"];
    const { cart, clearCart, updateQuantity, removeFromCart } = useCartStore();
    const [coupon, setCoupon] = useState("");
    const [apply, setApply] = useState(false);
    const [shoppingListItems, setShoppingListItems] = useState([]);

    useEffect(() => {
        // Obtener los elementos del carrito desde el estado de zustand
        setShoppingListItems(cart);
    }, [cart]);

    const handleCoupon = (e) => {
        setCoupon(e.target.value);
    };

    const handleApply = () => {
        if (!coupon) {
            setApply(false);
            return;
        }
        coupons.forEach(c => {
            if (coupon === c) {
                setApply(true);
                return;
            }
        });
    };

    const incrementar = (itemId) => {
        const item = shoppingListItems.find(item => item.id === itemId);
        updateQuantity(itemId, item.quantity + 1);
    };

    const decrementar = (itemId) => {
        const item = shoppingListItems.find(item => item.id === itemId);
        updateQuantity(itemId, item.quantity > 1 ? item.quantity - 1 : 1);
    };

    const calculateSubtotal = () => {
        return shoppingListItems.reduce((acum, item) => {
            return acum + item.price * item.quantity;
        }, 0);
    };

    const handleClick = () => {
        alert("Payment successful");
        clearCart();
        setShoppingListItems([]);
    };

    return (
        <>
            <div className="shopping__header">
                <h1>Your Bag</h1>
                <span>({shoppingListItems.length} Products)</span>
            </div>
            <section className="shoping__list">
                {shoppingListItems.map((item, index) => (
                    <article key={index} className="shop__item">
                        <div className="item__img">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item__info">
                            <h3 className="info__title">{item.title}</h3>
                            <h5 className="info__subtitle">{item.shortDescription}</h5>
                            <div className="item__values">
                                <section className="values__counter">
                                    <button className="values__btn" onClick={() => decrementar(item.id)}>-</button>
                                    <span className="value__count">{item.quantity}</span>
                                    <button className="values__btn" onClick={() => incrementar(item.id)}>+</button>
                                </section>
                                <section>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </section>
                                <button className="remove__btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
            <h3>Summary Order</h3>
            <section className="section__coupon">
                <p className="coupon__p">Have a coupon? input here to enter your code.</p>
                <div className="coupon__input">
                    <input type="text" onChange={handleCoupon} />
                    <button onClick={handleApply}>APPLY</button>
                </div>
            </section>
            <section className="payment">
                <div className="subtotal">
                    <p>Subtotal</p>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="shipping">
                    <p>Shipping</p>
                    <span>Free</span>
                </div>
                <div className="discount">
                    <p>Discount</p>
                    <span>{apply ? "-$20" : "-$0"}</span>
                </div>
            </section>
            <section>
                <div className="total">
                    <p>Grand Total</p>
                    <h2>${apply ? calculateSubtotal().toFixed(2) - 20 : calculateSubtotal().toFixed(2)}</h2>
                </div>
                <button className="checkout" onClick={handleClick}>CHECKOUT</button>
            </section>
        </>
    );
}

export default ShoppingList;
