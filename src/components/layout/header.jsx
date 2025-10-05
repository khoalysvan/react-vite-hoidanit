import "./header.css";
const Header = () => {
    return (
        <>
            <ul>
                <li>
                    <a class="active" href="#home">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#news">Users</a>
                </li>
                <li>
                    <a href="#contact">Products</a>
                </li>
            </ul>
        </>
    );
};

export default Header;
