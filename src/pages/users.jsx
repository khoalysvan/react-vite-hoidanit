import UserTable from "../components/user/user.table";
import UserForm from "../components/user/user.form";
import { fetchAllUserAPI } from "../services/api.service";
import { useState, useEffect } from "react";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    };
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} />;
        </div>
    );
};

export default UserPage;
