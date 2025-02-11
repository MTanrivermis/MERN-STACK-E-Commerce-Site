import { Spin, Table, message } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

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
