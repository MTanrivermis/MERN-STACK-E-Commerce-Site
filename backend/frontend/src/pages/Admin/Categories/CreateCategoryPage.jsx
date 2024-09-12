import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";


const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const apiUrl = "/api/v1";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/categories`, {
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
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Img (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your Img (Link)!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
