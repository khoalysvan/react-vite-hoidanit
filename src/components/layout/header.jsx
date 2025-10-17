import { Link } from "react-router-dom";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    SettingFilled,
    LoginOutlined,
    AliwangwangOutlined,
} from "@ant-design/icons";
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

        ...(!user.id
            ? [
                  {
                      label: <Link to={"/login"}>Đăng nhâp</Link>,
                      key: "login",
                      icon: <LoginOutlined />,
                  },
              ]
            : []),
        ...(user.id
            ? [
                  {
                      label: `Welcome ${user.fullName}`,
                      key: "logout",
                      icon: <AliwangwangOutlined />,
                      children: [{ label: "Đăng xuất", key: "logout" }],
                  },
              ]
            : []),

        {},
    ];

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
