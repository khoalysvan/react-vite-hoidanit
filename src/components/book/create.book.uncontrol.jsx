import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUncontrol = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;

    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmitBtn = async (values) => {
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
            const { mainText, author, price, quantity, category } = values;
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
        form.resetFields();
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
            title="Create Book (uncontrol Component)"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isCreateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"CREAT"}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmitBtn}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <Form.Item
                            label="Tiêu đề "
                            name="mainText"
                            rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tác giả "
                            name="author"
                            rules={[{ required: true, message: "Tác giả không được để trống!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giá tiền "
                            name="price"
                            rules={[{ required: true, message: "Giá tiền không được để trống!" }]}
                        >
                            <InputNumber addonAfter={"đ"} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng "
                            name="quantity"
                            rules={[{ required: true, message: "Số lượng không được để trống!" }]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Thể loại "
                            name="category"
                            rules={[{ required: true, message: "Thể loại không được để trống!" }]}
                        >
                            <Select
                                style={{ width: "100%" }}
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
                        </Form.Item>
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
                            style={{ display: "none" }}
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
            </Form>
        </Modal>
    );
};

export default CreateBookUncontrol;
