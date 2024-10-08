import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Spin, message } from "antd";

const CartTotals = () => {

    const [fastCargoChecked, setFastCargoChecked] = useState(false)

    const [loading, setLoading] = useState(false)

    const { cartItems } = useContext(CartContext);

    const stripePublickKey = "pk_test_51PIxb8D1wpi8ROVdyqQYfDopB5jCPuBDxuIGPtV16WOCAfq0npcMVGnse1zTKKzKeXdyrIaqUgvPVAoOwjSZuOOf00h6YOURCx"
    const apiUrl = "/api/v1"

    const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

    const cartItemTotals = cartItems.map((item) => {
        const itemTotal = item.price * item.quantity;

        return itemTotal
    })
    const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {

        return previousValue + currentValue;
    }, 0)

    const cargoFee = 15;

    const cartTotals = fastCargoChecked ? (subTotals + cargoFee).toFixed(2) : subTotals.toFixed(2)

    const handlePayment = async () => {
        setLoading(true)
        if(!user) {
            return message.info("You need to log in to make payment")
        }

        const body = {
            products: cartItems,
            user: user,
            cargoFee: fastCargoChecked ? cargoFee : 0
        };

        try {
            const stripe = await loadStripe(stripePublickKey)

            const res= await fetch(`${apiUrl}/payment`,{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            if(!res.ok) {
                return message.error("Payment transaction failed");
            }

            const session = await res.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if(result.error) {
                throw new Error(result.error.message)
            }

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };


    return (
        <div className="cart-totals">
            <h2>Cart totals
            </h2>
            <table>
                <tbody>
                    <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td>
                            <span id="subtotal">${subTotals.toFixed(2)}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>Shipping</th>
                        <td>
                            <ul>
                                <li>
                                    <label>
                                        Fast Cargo: $15.00
                                        <input type="checkbox" id="fast-cargo" checked={fastCargoChecked} onChange={() => setFastCargoChecked(!fastCargoChecked)} />
                                    </label>
                                </li>
                                <li>
                                    <a href="#">Change Address</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>
                            <strong id="cart-total">${cartTotals}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="checkout">
                <Spin spinning={loading}>
                <button className="btn btn-lg" onClick={handlePayment}>Proceed to checkout</button>
                </Spin>
                
            </div>
        </div>
    )
}

export default CartTotals