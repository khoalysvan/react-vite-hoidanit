import { Drawer } from "antd";

const ViewBookDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
    return (
        <Drawer
            title="Chi tiết book"
            closable={{ "aria-label": "Close Button" }}
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? (
                <>
                    <p style={{ textDecoration: "underline", color: "#a62828ff" }}>
                        Id: {dataDetail._id}
                    </p>
                    <br />
                    <h3>Tiêu đề: {dataDetail.mainText}</h3>
                    <br />

                    <p>Tác giả: {dataDetail.author}</p>
                    <br />

                    <p>Thể loại: {dataDetail.category}</p>
                    <br />
                    <p>
                        Giá tiền :{" "}
                        {dataDetail.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                    <br />
                    <p>Số lượng: {`${dataDetail.quantity} cuốn`}</p>
                    <br />
                    <p>Đã bán: {`${dataDetail.sold} cuốn`}</p>
                    <br />
                    <p>Thumbnail:</p>
                    <br />
                    <div
                        style={{
                            marginTop: "10px",
                            height: "200px",
                            width: "150px",
                            margin: "auto",
                            border: "1px solid #ccc",
                        }}
                    >
                        <img
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                                dataDetail.thumbnail
                            }`}
                        />
                    </div>
                </>
            ) : (
                <>
                    <p>Không có dữ liệu</p>
                </>
            )}
        </Drawer>
    );
};
export default ViewBookDetail;
