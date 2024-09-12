import { useContext, useState } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");

  const { cartItems, setCartItems } = useContext(CartContext);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if(couponCode.trim().length === 0) {
        return message.warning("Null value cannot be entered")
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.warning("Your coupon code is incorrect.");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

      const updateCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });

      setCartItems(updateCartItems);

      message.success(`${couponCode} Coupon code successfully applied.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
