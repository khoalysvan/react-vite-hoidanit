import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import ViewBookDetail from "./view.book.detail";
import { useEffect, useState } from "react";
import CreateBookControl from "./create.book.control";
import CreateBookUncontrol from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";

const BookTable = (props) => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState();
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        setDataBooks(res.data.result);
        setCurrent(res.data.meta.current);
        setPageSize(res.data.meta.pageSize);
        setTotal(res.data.meta.total);
    };
    const handleDeleteBook = async (id) => {
        alert("me");
        // const res = await deleteBookAPI(id);
        // if (res.data) {
        //     notification.success({
        //         message: "Delete Book",
        //         description: "Xóa book thành công",
        //     });
        //     await loadBook();
        // } else {
        //     notification.error({
        //         message: "Error delete book",
        //         description: JSON.stringify(res.message),
        //     });
        // }
    };
    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return <>{index + 1 + (current - 1) * pageSize}</>;
            },
        },
        {
            title: "Id",
            dataIndex: "_id",
            key: "id",
            render: (_, record) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >
                        {record._id}
                    </a>
                );
            },
        },
        {
            title: "Tiêu đề ",
            dataIndex: "mainText",
            key: "mainText",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
            render: (_, record) => {
                return (
                    <span>
                        {record.price.toLocaleString("vi", { style: "currency", currency: "VND" })}
                    </span>
                );
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Tác giả ",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete this book"
                        description="Are you sure to delete this book?"
                        placement="left"
                        onConfirm={() => handleDeleteBook(record._id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current); // "5" => 5
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize); // "5" => 5
            }
        }
    };
    return (
        <>
            <div className="book-form " style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Books</h3>
                    <Button type="primary" onClick={() => setIsCreateOpen(true)}>
                        Create Book
                    </Button>
                </div>
            </div>
            <Table
                dataSource={dataBooks}
                columns={columns}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
            />
            <ViewBookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadBook={loadBook}
            />
            {/* <CreateBookControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            /> */}
            <CreateBookUncontrol
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            />
            <UpdateBookControl
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
            />
        </>
    );
};
export default BookTable;
