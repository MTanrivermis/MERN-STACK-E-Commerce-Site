import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const apiUrl = "/api/v1";

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key:"price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "Discount",
      dataIndex: "price",
      key:"price",
      render: (text) => <span>%{text.discount}</span>,
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
            <Button type="primary" onClick={()=> navigate(`/admin/products/update/${record._id}`)}>
              Update
            </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];



  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Category deleted successfully");
        // fetchCategories();
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId)
        })
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
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const [categoriesResponse, productResponse] = await Promise.all([
          fetch(`${apiUrl}/categories`),
          fetch(`${apiUrl}/products`),
        ]);

        if(!categoriesResponse.ok || !productResponse.ok){
          message.error("Data fetch failed")
        }
  
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productResponse.json(),
        ]);

        const productsWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );

          return {
            ...product,
            categoryName: category ? category.name : "",
          }
        });
        setDataSource(productsWithCategories)
      } catch (error) {
        console.log("Data Error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [apiUrl]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ProductPage;
