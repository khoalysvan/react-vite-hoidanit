import { ArrowRightOutlined } from "@ant-design/icons";
import { Input, Button, Form, notification, Row, Col, Divider, message } from "antd";
import { Link } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.contex";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);
    const onFinish = async (values) => {
        setLoading(true);
        console.log(">>> check values: ", values);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message),
            });
        }
        setLoading(false);
    };

    return (
        <Row justify={"center"} style={{ margin: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: "15px",
                        margin: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    <legend>Đăng nhập</legend>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Email không được để trống!" },
                                {
                                    type: "email",
                                    message: "Email không hợp lệ!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Password không được để trống!" }]}
                        >
                            <Input.Password
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") form.submit();
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    loading={loading}
                                    type="primary"
                                    onClick={() => form.submit()}
                                >
                                    Login
                                </Button>
                                <Link to="/">
                                    Go to homepage <ArrowRightOutlined />
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản <Link to={"/register"}>Đăng ký tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default LoginPage;
