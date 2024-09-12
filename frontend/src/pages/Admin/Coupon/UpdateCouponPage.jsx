import { Button, Form, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const [form] = Form.useForm();

  const params = useParams();
  const couponId = params.id;

  const apiUrl = "/api/v1";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("The coupon code has been updated successfully");
        navigate("/admin/coupons")
      } else {
        message.error("An error occurred while updating the Coupon Code");
      }
    } catch (error) {
      console.log("Coupon Code update error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleCategory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/coupons/${couponId}`);

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();

      if (data) {
        form.setFieldsValue({
          code: data.code,
          discountPercent: data.discountPercent,
        });
      }
    } catch (error) {
      console.log("Data Error", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, form, couponId ]);

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
          label="Coupon Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input your Coupon Code!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coupon Discount Rate"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input your Coupon Discount Rate!",
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

export default UpdateCouponPage;
