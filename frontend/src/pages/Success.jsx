import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartProvider";

const Success = () => {

    const { setCartItems } = useContext(CartContext);

    useEffect(() => {
      setCartItems([]);
    }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment Successfully "
          subTitle="Your payment has been completed successfully"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">HOME</Button>
            </Link>,
            <a href="/admin/orders" key="order">
            <Button key="buy">MY ORDERS</Button>,
          </a>   
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
