import { Link } from "react-router-dom";
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, SettingFilled } from "@ant-design/icons";
import { Menu } from "antd";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.contex";

const Header = () => {
    const [current, setCurrent] = useState("");

    const { user, setUser } = useContext(AuthContext);

    console.log(">>> check user: ", user);
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: "users",
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },
        {
            label: "Cài đặt",
            key: "settings",
            icon: <SettingFilled />,
            children: [
                { label: <Link to={"/login"}>Đăng nhập</Link>, key: "login" },
                { label: "Đăng xuất", key: "logout" },
            ],
        },
    ];

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
