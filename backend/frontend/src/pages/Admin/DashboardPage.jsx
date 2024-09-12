import { Row, Col, Card, Statistic, message } from "antd";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardPage = () => {

  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const MY_STRIPE_SECRET_KEY = "sk_test_51PIxb8D1wpi8ROVdbw63aFGUCDh520IpULu9j6I4ZRlQJx5XwrJAJV3dhG6XubL0cg4YFIAQUepjXufJanho7rZJ00urbmOKX4"

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
          console.log(data[0])
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


  // const productSalesData = [
  //   { name: "Ocak", satilanUrunSayisi: 10 },
  //   { name: "Şubat", satilanUrunSayisi: 15 },
  //   { name: "Mart", satilanUrunSayisi: 20 },
  //   { name: "Nisan", satilanUrunSayisi: 25 },
  //   { name: "Mayıs", satilanUrunSayisi: 30 },
  //   { name: "Haziran", satilanUrunSayisi: 35 },
  // ];

  const customerData = [
    { name: "Ocak", musteriSayisi: 20 },
    { name: "Şubat", musteriSayisi: 25 },
    { name: "Mart", musteriSayisi: 30 },
    { name: "Nisan", musteriSayisi: 10 },
    { name: "Mayıs", musteriSayisi: 40 },
    { name: "Haziran", musteriSayisi: 45 },
  ];

  const productSalesData = dataSource.map((data) => (
    {name: "OCAK", satilanUrunSayisi: 5}
  ))


  console.log(productSalesData)

  const saleDate = new Date(dataSource.created * 1000); 
  console.log(saleDate); 
  
  const userNumber = new Set()
  dataSource.forEach((data) => userNumber.add(data.receipt_email))

  const totalAmount = dataSource.reduce((acc, data) => acc += data.amount, 0)
  console.log(totalAmount)

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Ürün Satışı" value={dataSource.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Müşteri Sayısı" value={userNumber.size} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Gelir" value={totalAmount / 100} prefix="$"/>
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: "20px" }}>
        <h2>Son Aydaki Ürün Satış Artışı</h2>
        <LineChart
          width={600}
          height={600}
          data={productSalesData}
          margin={{ top: 5, right: 30, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="satilanUrunSayisi"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <h2>Son Aydaki Müşteri Artışı</h2>
        <LineChart
          width={600}
          height={300}
          data={customerData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="musteriSayisi"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

export default DashboardPage;