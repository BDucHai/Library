import { Delete } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Slide,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Cart = ({ data, index }) => {
    const [messSold, setMessSold] = useState("");
    const [openSoldDialog, setOpenSoldDialog] = useState(false);
    const [ask, setAsk] = useState(false);

    const handleSold = async () => {
        setAsk(false);
        await axios
            .post(`http://localhost:8080/api/book/sold/${data.idBook}`, {
                sold: data.total,
            })
            .then(() => {
                setMessSold("Cảm ơn bạn đã mua hàng!");
                setOpenSoldDialog(true);
                handleDelete();
            })
            .catch(() => {
                setMessSold("Mua hàng không thành công hãy thử lại sau!");
                setOpenSoldDialog(true);
            });
    };

    const handleDelete = async () => {
        axios.delete(`http://localhost:8080/api/cart/${data.id}`);
    };

    return (
        <>
            <div className="flex py-[8px]">
                <div className="w-[20%] mr-[20px]">
                    <img src={data.img} alt="bìa sách" className="w-full" />
                </div>
                <div className="w-[50%] pl-[8px] md:pl-[80px]">
                    <div className="text-[16px] md:text-[24px] text-[#ff7e7e]">{data.bookTitle}</div>
                    <p>Thời điểm thêm vào giỏ hàng:</p>
                    <p className="text-[#ccc]">
                        {data.date} <p className="mx-[6px]"></p> {data.time}
                    </p>
                </div>
                <div className="flex justify-center items-start md:items-center w-[30%] md:w-[10%]">
                    <div className="border-2 border-[#fff] font-bold py-[6px] px-[12px] rounded-[3px]">
                        {data.total}
                    </div>
                </div>
                <div className="hidden md:flex justify-center items-center w-[20%]">
                    <Tooltip title="Hủy đặt" onClick={handleDelete}>
                        <IconButton>
                            <Delete sx={{ color: "#fff", cursor: "pointer" }} />
                        </IconButton>
                    </Tooltip>
                    <div
                        className="text-[12px] md:text-[14px] px-[8px] py-[6px] bg-[red] mt-[4px] rounded-[4px] cursor-pointer"
                        onClick={() => setAsk(true)}>
                        Thanh toán
                    </div>
                    <Dialog
                        open={ask}
                        onClose={() => setAsk(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Xác định mua?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setAsk(false)}>Hủy</Button>
                            <Button onClick={handleSold} autoFocus>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openSoldDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setOpenSoldDialog(false)}
                        aria-describedby="alert-dialog-slide-description">
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">{messSold}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenSoldDialog(false)}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className="flex items-center md:hidden mb-[10px]">
                <div
                    className="text-[12px] md:text-[14px] mr-[40px] px-[5px] py-[4px] bg-[red] mt-[4px] rounded-[4px] cursor-pointer"
                    onClick={handleSold}>
                    Thanh toán
                </div>
                <Tooltip title="Hủy đặt" onClick={handleDelete}>
                    <IconButton>
                        <Delete sx={{ color: "#fff", cursor: "pointer" }} />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
};

export default Cart;
