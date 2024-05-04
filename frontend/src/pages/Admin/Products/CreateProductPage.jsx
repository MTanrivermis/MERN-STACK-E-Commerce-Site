import { Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The category has been created successfully");
        form.resetFields()
      } else {
        message.error("An error occurred while creating the category");
      }
    } catch (error) {
      console.log("Category create error", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
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
          <ReactQuill theme="snow" style={{backgroundColor:"white"}} />
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
          <Input.TextArea placeholder="Please use a new line for each image link." autoSize={{minRows:4}}/>
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
          <Input.TextArea placeholder="Please use a new line for each RGB Codes link." autoSize={{minRows:4}}/>
        </Form.Item>
        <Form.Item
          label="Product Size (Links)"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Please input your minimum one pieces Product sizes (Link)!",
            },
          ]}
        >
          <Input.TextArea placeholder="Please use a new line for each body size." autoSize={{minRows:4}}/>
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
            <Select.Option value="Smartphone" key={"Smartphone"}>Smartphone</Select.Option>
          </Select>
        </Form.Item>


        

        {/* <Button type="primary" htmlType="submit">
          Create
        </Button> */}
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
