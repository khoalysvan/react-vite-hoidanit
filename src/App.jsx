import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.contex";
import { Spin } from "antd";

const App = () => {
    const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    // const delay = (miliSecond) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve();
    //         }, miliSecond);
    //     });
    // };
    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        // await delay(3000);
        if (res.data) {
            //success
            setUser(res.data.user);
            console.log(">>> check user data: ", res.data);
        }
        setIsAppLoading(false);
    };
    return (
        <>
            {isAppLoading === true ? (
                <Spin
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ) : (
                <>
                    {" "}
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
};

export default App;
