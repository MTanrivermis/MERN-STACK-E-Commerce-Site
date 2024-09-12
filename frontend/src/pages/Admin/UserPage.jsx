import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const apiUrl = "/api/v1";

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{ width: "50px", borderRadius: "50%", height: "50px" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Data Fetch Failed",);
      }
    } catch (error) {
      console.log("Data Error", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);


  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userEmail}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("User deleted successfully")
        fetchUsers()
      } else {
        message.error("Deletion failed")
      }
    } catch (error) {
      console.log("Delete Error", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default UserPage;
