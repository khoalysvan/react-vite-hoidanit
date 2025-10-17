import { Link, useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    SettingFilled,
    LoginOutlined,
    AliwangwangOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.contex";
import { logoutAPI } from "../../services/api.service";

const Header = () => {
    const [current, setCurrent] = useState("");

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(">>> check user: ", user);
    const onClick = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            });
            message.success("Logout thành công");
            //redirect home
            navigate("/");
        }
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
                      children: [
                          {
                              label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                              key: "logout",
                          },
                      ],
                  },
              ]
            : []),

        {},
    ];

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
