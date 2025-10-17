import { useContext } from "react";
import { AuthContext } from "../components/context/auth.contex";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
        return <>{props.children}</>;
    }

    // return <Navigate to="/login" replace />;
    return (
        <>
            <div id="error-page">
                <Result
                    status="403"
                    title="Unauthorize!"
                    subTitle="Bạn cần đăng nhập để truy cập tài nguyên này"
                    extra={
                        <Button type="primary">
                            <Link to="/">
                                <span>Back to Homepage</span>
                            </Link>
                        </Button>
                    }
                />
            </div>
        </>
    );
};
export default PrivateRoute;
