import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate()

  const [form] = Form.useForm();

  const apiUrl = "/api/v1";

  const params = useParams();
  const productId = params.id

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const [categoriesResponse, singleProductResponse] = await Promise.all([
          fetch(`${apiUrl}/categories`),
          fetch(`${apiUrl}/products/${productId}`),
        ]);

        if(!categoriesResponse.ok || !singleProductResponse.ok){
          message.error("Data fetch failed")
          return;
        }
  
        const [categoriesData, singleProductData] = await Promise.all([
          categoriesResponse.json(),
          singleProductResponse.json(),
        ]);

        setCategories(categoriesData)

        if(singleProductData){
          form.setFieldsValue({
            name: singleProductData.name,
            current: singleProductData.price.current,
            discount: singleProductData.price.discount,
            description: singleProductData.description,
            img: singleProductData.img.join("\n"),
            colors: singleProductData.colors.join("\n"),
            sizes: singleProductData.sizes.join("\n"),
            category: singleProductData.category,
          });
        }

      } catch (error) {
        console.log("Data Error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [apiUrl,productId, form]);


  const onFinish = async (values) => {

    const imgLinks = values.img
      .split("\n")
      .map((link) => link.trim());

      const colors = values.colors
      .split("\n")
      .map((link) => link.trim());

      const sizes = values.sizes
      .split("\n")
      .map((link) => link.trim());

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values, 
          price: {
            current: values.current,
            discount: values.discount
          },
          colors,
          sizes,
          img: imgLinks,
        }),
      });

      if (response.ok) {
        message.success("The product has been update successfully");
        navigate("/admin/products")
      } else {
        message.error("An error occurred while updating the product");
      }
    } catch (error) {
      console.log("Product update error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please pick your product category!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="current"
          rules={[
            {
              required: true,
              message: "Please input your product price!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Discount Rate"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input your discount rate!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your Product Description!",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Product Img (Links)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your four pieces Product Img (Link)!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Please use a new line for each image link."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Product Colors (RGB Codes)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Please input your minimum one pieces Product Colors!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Please use a new line for each RGB Codes link."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Product Size (Links)"
          name="sizes"
          rules={[
            {
              required: true,
              message:
                "Please input your minimum one pieces Product sizes (Link)!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Please use a new line for each body size."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
