import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Button } from "@mui/material";
import { CardGiftcard } from "@mui/icons-material";

const ViewBook = () => {
    const { id } = useParams();

    const [book, setBook] = useState();

    useEffect(() => {
        const getBook = async () => {
            await axios.get(`http://localhost:8080/api/book/${id}`).then((e) => {
                setBook(e.data);
            });
        };
        getBook();
    }, []);
    return (
        <>
            {book && (
                <>
                    <Nav />
                    <div className="bg-[#78909c] p-[36px] text-white">
                        <div className="max-w-[1200px] mx-[auto] mb-[8px] text-[#240404]">
                            Sách Tiếng Việt {">"} {book.genre}
                        </div>
                        <div className="lg:flex max-w-[1200px] mx-[auto] bg-[#201a1a] rounded-[4px] p-[16px] pt-[25px]">
                            <div className="ml-[60px] lg:w-[30%]">
                                <img src={book.imgBook} alt="bìa sách" />
                            </div>
                            <div className="text-[14px] p-[36px] pt-[0] lg:w-[70%]">
                                <span className="text-[26px] font-semibold">{book.title}</span>
                                <div className="lg:flex mt-[20px]">
                                    <div className="lg:w-[60%]">Nhà cung cấp: Nhà xuất bản Max</div>
                                    <div className="lg:w-[40%]">Tác giả: {book.author}</div>
                                </div>
                                <div className="lg:flex my-[8px]">
                                    <div className="lg:w-[60%]">Hình thức: bìa cứng</div>
                                    <div className="lg:w-[40%]">Bộ: {book.length}</div>
                                </div>

                                <div className="w-full mt-[12px]">
                                    <h4 className="inline-block">Chính sách đổi trả</h4>
                                    <p className="ml-[40px] inline-block">Đổi trả sản phẩm trong vòng 30 ngày.</p>
                                </div>
                                <div className="mt-[40px]">
                                    <Button
                                        variant="outlined"
                                        startIcon={<CardGiftcard />}
                                        sx={{
                                            color: "#db6262",
                                            borderColor: "#db6262",
                                            marginRight: { lg: "20px" },
                                            "&:hover": { color: "#fff" },
                                        }}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button variant="contained">
                                        Mua ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ViewBook;
