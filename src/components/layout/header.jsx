import "./header.css";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <ul>
                <li>
                    <a class="active" href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/users">Users</a>
                </li>
                <li>
                    <a href="/products">Products</a>
                </li>
            </ul>
        </>
    );
};

export default Header;
