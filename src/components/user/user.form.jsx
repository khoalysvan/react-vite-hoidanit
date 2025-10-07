import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import axios from "axios";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModelOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "create user",
                description: "Tạo mới user thành công",
            });
            resetAndCloseModal();
            props.loadUser();
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModelOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    };
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={() => setIsModelOpen(true)}>
                    Create User
                </Button>
            </div>

            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREAT"}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column",
                    }}
                >
                    <div>
                        <span>Full Name</span>
                        <Input
                            value={fullName}
                            onChange={(event) =>
                                setFullName(event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default UserForm;
