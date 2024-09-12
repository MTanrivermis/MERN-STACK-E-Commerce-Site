import { Spin, Table, message } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const MY_STRIPE_SECRET_KEY = "sk_test_51PIxb8D1wpi8ROVdbw63aFGUCDh520IpULu9j6I4ZRlQJx5XwrJAJV3dhG6XubL0cg4YFIAQUepjXufJanho7rZJ00urbmOKX4"

  const columns = [
    {
      title: "Costumer E-mail",
      dataIndex: "receipt_email",
      key: "receipt_email",
    },
    {
      title: "Order Price",
      dataIndex: "amount",
      key: "amount",
      render: (record) => <b>${(record / 100).toFixed(2)}</b>
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/payment_intents`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setDataSource(data);
          console.log(data)
        } else {
          message.error("Data Fetch Failed");
        }
      } catch (error) {
        console.log("Data Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY]);

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
      />
    </Spin>
  );
};

export default OrderPage;
