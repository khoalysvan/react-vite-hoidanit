import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error Create Book",
                description: "Vui lòng upload lại thumbnail",
            });
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        console.log(">>> check resUpload: ", resUpload);
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            //create book
            const resBook = await createBookAPI(
                newThumbnail,
                mainText,
                author,
                price,
                quantity,
                category
            );
            if (resBook.data) {
                resetAndCloseModal();
                await loadBook();
                notification.success({
                    message: "Create Book",
                    description: "Tạo mới sách thành công",
                });
            } else {
                notification.error({
                    message: "Error Create Book",
                    description: JSON.stringify(resBook.message),
                });
            }
        } else {
            notification.error({
                message: "Error Upload File",
                description: JSON.stringify(resUpload.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setPreview(null);
        setSelectedFile(null);
        setIsCreateOpen(false);
    };

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    return (
        <Modal
            title="Create Book"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isCreateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"CREAT"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Tiêu đề </span>
                    <Input value={mainText} onChange={(event) => setMainText(event.target.value)} />
                </div>
                <div>
                    <span>Tác giả</span>
                    <Input value={author} onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    <span>Giá tiền</span>
                    <InputNumber
                        value={price}
                        addonAfter={"đ"}
                        style={{ width: "100%" }}
                        onChange={(event) => setPrice(event)}
                    />
                </div>
                <div>
                    <span>Số lượng</span>
                    <InputNumber
                        value={quantity}
                        style={{ width: "100%" }}
                        onChange={(event) => setQuantity(event)}
                    />
                </div>
                <div>
                    <span>Thể loại</span>
                    <Select
                        style={{ width: "100%" }}
                        value={category}
                        onChange={(value) => setCategory(value)}
                        options={[
                            { value: "Arts", label: "Arts" },
                            { value: "Business", label: "Business" },
                            { value: "Comics", label: "Comics" },
                            { value: "Cooking", label: "Cooking" },
                            { value: "Entertainment", label: "Entertainment" },
                            { value: "History", label: "History" },
                            { value: "Music", label: "Music" },
                            { value: "Sports", label: "Sports" },
                            { value: "Teen", label: "Teen" },
                            { value: "Travel", label: "Travel" },
                        ]}
                    />
                </div>
                <div>
                    <div>Ảnh Thumbnail</div>
                    <label
                        htmlFor="btnUpload"
                        style={{
                            background: "#c65d1cff",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            display: "inline-block",
                            marginTop: "15px",
                            cursor: "pointer",
                        }}
                    >
                        Upload
                    </label>
                    <input
                        type="file"
                        hidden
                        id="btnUpload"
                        onChange={(event) => handleOnChangeFile(event)}
                        onClick={(event) => (event.target.value = null)}
                    />
                </div>
                {preview && (
                    <>
                        <div
                            style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                height: "150px",
                                width: "100px",
                            }}
                        >
                            <img
                                style={{ heigh: "100%", width: "100%", objectFit: "contain" }}
                                src={preview}
                            />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};
export default CreateBookControl;
