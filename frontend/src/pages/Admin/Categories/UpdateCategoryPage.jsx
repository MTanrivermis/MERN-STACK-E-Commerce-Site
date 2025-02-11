import { Button, Form, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const params = useParams();
  const categoryId = params.id;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The category has been updated successfully");
      } else {
        message.error("An error occurred while updating the category");
      }
    } catch (error) {
      console.log("Category update error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCategory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();

      if (data) {
        form.setFieldsValue({
          name: data.name,
          img: data.img,
        });
      }
    } catch (error) {
      console.log("Data Error", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
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
          Update
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
