import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const apiUrl = "/api/v1";

  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
      render: (code) => <b> {code} </b>,
    },
    {
      title: "Discount",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (discount) => <span>%{discount}</span>,
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
            <Button type="primary" onClick={()=> navigate(`/admin/coupons/update/${record._id}`)}>
              Update
            </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/coupons`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Data Fetch Failed");
      }
    } catch (error) {
      console.log("Data Error", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Coupon deleted successfully");
        fetchCategories();
      } else {
        message.error("Deletion failed");
      }
    } catch (error) {
      console.log("Delete Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CouponPage;
