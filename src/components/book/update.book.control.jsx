import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
    const { dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook } = props;

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate]);

    const updateBook = async (newThumbnail) => {
        const resBook = await updateBookAPI(
            id,
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
                message: "Update Book ",
                description: "Update book thành công",
            });
        } else {
            notification.error({
                message: "Error Create Book",
                description: JSON.stringify(resBook.message),
            });
        }
    };
    const handleSubmitBtn = async () => {
        //Không có ảnh preview + không có file
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error Update Book",
                description: "Vui lòng upload lại ảnh thumbnail",
            });
            return;
        }

        let newThumbnail = "";
        //có ảnh preview và không có file => không uploadfile
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            //có ảnh preview và có file => upload file
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error Upload file",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }

        //step 2: update book
        await updateBook(newThumbnail);
    };
    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setPreview(null);
        setSelectedFile(null);
        setIsModalUpdateOpen(false);
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
            title="Update Book"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"UPDATE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>ID</span>
                    <Input
                        value={id}
                        disabled
                        onChange={(event) => setMainText(event.target.value)}
                    />
                </div>
                <div>
                    <span>Tiêu đề </span>
                    <Input value={mainText} onChange={(event) => setMainText(event.target.value)} />
                </div>
                <div>
                    <span>Tác giả </span>
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
                        addonAfter={"đ"}
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
            </div>
        </Modal>
    );
};

export default UpdateBookControl;
