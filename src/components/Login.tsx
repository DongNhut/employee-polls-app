import { Row, Col, Button, Input, Form, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Login, isLogin } from "../stores/action";
import { listSelector } from "../stores/selector";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listUser = useSelector(listSelector);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginInput = () => {
    dispatch<any>(
      Login({
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password"),
      })
    )
      .then(() => {
        navigate("/home");
      })
      .catch((error: any) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    const userList = Object.values(listUser);
    const hasActiveUser = userList.some(
      (user: any) => user.status === "Active"
    );
    hasActiveUser ? navigate("/home") : navigate("/login");
  }, [listUser, navigate]);

  const handleLogin = (user: any) => {
    dispatch(isLogin(user.id));
    const getPathItem = localStorage.getItem("redirectUrl");
    console.log("getPathItem", getPathItem);
    if (getPathItem) {
      console.log("oke", getPathItem);
      navigate(getPathItem);
    } else {
      console.log("home");
      navigate("/home");
    }
  };

  useEffect(() => {
    localStorage.setItem("currentURL", location.pathname);
    const savedURL: any = localStorage.getItem("currentURL");
    if (savedURL && savedURL !== savedURL?.includes("/login")) {
      if (savedURL && savedURL?.includes("question/")) {
        localStorage.setItem("redirectUrl", location.pathname);
        console.log("savedURL", savedURL);
      }
    }
  }, [location]);

  return (
    <Form
      style={{ justifyContent: "center", display: "grid", marginTop: "100px" }}
      form={form}
      layout="vertical"
    >
      <h5 style={{ textAlign: "center", color: "darkblue" }}>
        Welcome to my APP
      </h5>
      <Row justify="center">
        <Col span={24}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={handleLoginInput}
          style={{ width: "100%", height: "40px", fontSize: "16px" }}
        >
          Login
        </Button>
        <h3 style={{ textAlign: "center", paddingTop: "20px" }}>Or</h3>
      </Form.Item>
      {Object.keys(listUser).map((key) => {
        const user = listUser[key];
        return (
          <Button
            key={user.id}
            style={{ marginBottom: "10px", borderRadius: "5px", height: 40 }}
            onClick={() => handleLogin(user)}
          >
            {user.username}
          </Button>
        );
      })}
    </Form>
  );
};
export default LoginPage;
