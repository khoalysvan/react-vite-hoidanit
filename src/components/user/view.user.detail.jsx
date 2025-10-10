import { Drawer, Button } from "antd";

const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

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
                    <div>
                        <img
                            height={250}
                            width={250}
                            src={`${
                                import.meta.env.VITE_BACKEND_URL
                            }/images/avatar/${dataDetail.avatar}`}
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
                        <input type="file" hidden id="btnUpload" />
                    </div>
                    {/* <Button type="primary">Upload Avatar</Button> */}
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
