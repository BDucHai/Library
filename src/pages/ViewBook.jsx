import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, Slide } from "@mui/material";
import { CardGiftcard } from "@mui/icons-material";
import { LoginContext } from "../context/LoginProvider";
import ReactBook from "../components/ReactBook";
import Footer from "../components/Footer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewBook = () => {
    const { id } = useParams();
    const context = useContext(LoginContext);
    const [book, setBook] = useState();
    const [sold, setSold] = useState(1);
    const [messSold, setMessSold] = useState("");
    const [openSoldDialog, setOpenSoldDialog] = useState(false);

    useEffect(() => {
        const getBook = async () => {
            await axios.get(`http://localhost:8080/api/book/${id}`).then((e) => {
                setBook(e.data);
            });
        };
        getBook();
    }, [id]);

    const handleSold = async () => {
        if (context.active) {
            await axios
                .post(`http://localhost:8080/api/book/sold/${id}`, {
                    sold: sold,
                })
                .then(() => {
                    setMessSold("Cảm ơn bạn đã mua hàng!");
                    setOpenSoldDialog(true);
                    setSold(1);
                })
                .catch(() => {
                    setMessSold("Mua hàng không thành công hãy thử lại sau!");
                    setOpenSoldDialog(true);
                });
        } else {
            setMessSold("Vui lòng đăng nhập để mua hàng");
            setOpenSoldDialog(true);
        }
    };

    const handleAddCart = async () => {
        await axios
            .post(`http://localhost:8080/api/cart/${context.user.id}/book/${id}`, {
                total: sold,
                bookTitle: book.title,
            })
            .then((e) => {
                setMessSold("Đã thêm vào giỏ hàng!");
                setOpenSoldDialog(true);
            })
            .catch((e) => {
                setMessSold("Thêm vào giỏ hàng không thành công!");
                setOpenSoldDialog(true);
            });
    };

    const soldBonus = () => {
        if (sold < 2) {
            setSold(1);
        } else {
            setSold(sold - 1);
        }
    };
    return (
        <>
            {book && (
                <>
                    <Nav />
                    <div className="bg-[#78909c] p-[36px] text-white">
                        <div className="max-w-[1200px] mx-[auto] mb-[8px] text-[#240404]">
                            Sách Tiếng Việt {">"} {book.genre}
                        </div>
                        <div className="md:flex max-w-[1200px] mx-[auto] bg-[#201a1a] rounded-[4px] p-[16px] pt-[25px]">
                            <div className="flex justify-center mb-[16px] lg:mb-[0] lg:block lg:ml-[60px] lg:w-[30%]">
                                <img src={book.imgBook} alt="bìa sách" />
                            </div>
                            <div className=" text-[12px] md:text-[14px] p-[36px] pt-[0] lg:w-[70%]">
                                <span className="text-[18px] md:text-[26px] font-semibold">{book.title}</span>
                                <div className="lg:flex mt-[12px] lg:mt-[20px]">
                                    <div className="lg:w-[60%]">Nhà cung cấp: Nhà xuất bản Max</div>
                                    <div className="lg:w-[40%]">Tác giả: {book.author}</div>
                                </div>
                                <div className="lg:flex my-[8px]">
                                    <div className="lg:w-[60%]">Hình thức: Bìa cứng</div>
                                    <div className="lg:w-[40%]">Bộ: {book.length}</div>
                                </div>

                                <div className="w-full mt-[12px] mb-[20px]">
                                    <h4 className="inline-block">Chính sách đổi trả:</h4>
                                    <p className="ml-[40px] inline-block">Đổi trả sản phẩm trong vòng 30 ngày.</p>
                                </div>
                                <div>
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button onClick={soldBonus}>-</Button>
                                        <input
                                            type="text"
                                            value={sold}
                                            className="w-[60px] text-[#000] text-center outline-none font-semibold"
                                        />
                                        <Button onClick={() => setSold((prev) => prev + 1)}>+</Button>
                                    </ButtonGroup>
                                </div>
                                <div className="mt-[40px]">
                                    <Button
                                        variant="outlined"
                                        startIcon={<CardGiftcard />}
                                        onClick={handleAddCart}
                                        sx={{
                                            fontSize: { xs: "10px", lg: "16px" },
                                            color: "#db6262",
                                            borderColor: "#db6262",
                                            marginRight: { sm: "20px" },
                                            width: { xs: "90%", sm: "auto" },
                                            "&:hover": { color: "#fff" },
                                        }}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontSize: { xs: "10px", lg: "16px" },
                                            marginTop: { xs: "16px", sm: "0px" },
                                            width: { xs: "90%", sm: "auto" },
                                        }}
                                        onClick={handleSold}>
                                        Mua ngay
                                    </Button>
                                    <Dialog
                                        open={openSoldDialog}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={() => setOpenSoldDialog(false)}
                                        aria-describedby="alert-dialog-slide-description">
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                                {messSold}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            {context.active ? (
                                                <Button onClick={() => setOpenSoldDialog(false)}>Ok</Button>
                                            ) : (
                                                <Link to="/login">
                                                    <Button>Đăng nhập</Button>
                                                </Link>
                                            )}
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[1200px] mx-[auto] bg-[#201a1a] rounded-[4px] p-[16px] mt-[25px]">
                            <p className="text-[16px] md:text-[18px] font-semibold">Thông tin sản phẩm</p>

                            <table className="pb-[20px] border-b-2 border-[#777] text-[12px] md:text-[14px] w-full mt-[26px]">
                                <colgroup className="w-[50%] md:w-[25%]"></colgroup>
                                <tbody>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Mã hàng</th>
                                        <td>{book.id}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Tác giả</th>
                                        <td>{book.author}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Thời gian phát hành</th>
                                        <td>{book.releaseDate}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Trọng lượng (gr)</th>
                                        <td>420</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Số trang</th>
                                        <td>{book.length}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Hình thức</th>
                                        <td>Bìa Cứng</td>
                                    </tr>
                                    <tr>
                                        <th className="text-start font-medium text-[#ccc]">Đã bán:</th>
                                        <td>{book.sold}</td>
                                    </tr>
                                    <tr className="h-[14px]">
                                        <th></th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="my-[10px] text-[12px] md:text-[15px] ">
                                <h3 className="text-[14px] md:text-[16px] font-bold mt-[16px] mb-[12px]">
                                    {book.title}
                                </h3>
                                <p>{book.description}</p>
                            </div>
                        </div>
                        <ReactBook bookId={id} />
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default ViewBook;
