import { Drawer, Button, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            console.log(">>> check newAvatar: ", newAvatar);
            //step 2: update file
            const resUploadAvatar = await updateUserAvatarAPI(
                newAvatar,
                dataDetail._id,
                dataDetail.fullName,
                dataDetail.phone
            );
            if (resUploadAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công",
                });
            } else {
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resUploadAvatar.message),
                });
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
        }
    };
    return (
        <Drawer
            title="Chi tiết user"
            closable={{ "aria-label": "Close Button" }}
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? (
                <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full Name: {dataDetail.fullName}</p>
                    <br />

                    <p>Email: {dataDetail.email}</p>
                    <br />

                    <p>Phone: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar</p>
                    <div
                        style={{
                            marginTop: "10px",
                            height: "100px",
                            width: "150px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <img
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                                dataDetail.avatar
                            }`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="btnUpload"
                            style={{
                                background: "#ccc",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                display: "inline-block",
                                marginTop: "15px",
                                cursor: "pointer",
                            }}
                        >
                            Upload avatar
                        </label>
                        <input type="file" hidden id="btnUpload" onChange={handleOnChangeFile} />
                    </div>
                    {preview && (
                        <>
                            <div
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    height: "100px",
                                    width: "150px",
                                }}
                            >
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                    }}
                                    src={preview}
                                />
                            </div>
                            <Button type="primary" onClick={() => handleUpdateUserAvatar()}>
                                Save
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <p>Không có dữ liệu</p>
                </>
            )}
        </Drawer>
    );
};
export default ViewUserDetail;
