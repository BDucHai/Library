import React, { useContext, useEffect, useState } from "react";
import { logo } from "../images";
import { LoginContext } from "../context/LoginProvider";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {
    AddShoppingCart,
    FacebookOutlined,
    Home,
    Instagram,
    Logout,
    Person,
    PersonAdd,
    Search,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const context = useContext(LoginContext);
    const [inputValue, setInputValue] = useState("");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        context.handleCookie();
    }, []);

    const handleSearch = () => {
        if (inputValue !== "") {
            navigate(`/book/find/${inputValue}`);
        }
    };

    const handleCart = () => {
        if (context.active) {
            navigate("/shoppingCart");
        } else {
            setOpen(true);
        }
    };

    return (
        <>
            <div className="fixed z-[10] top-0 w-full flex justify-between items-center bg-gradient-to-b from-[#33282a] to-[#3f2929] px-[20px] md:px-[100px] pt-[10px] pb-[4px] text-[#f6efef] bg-[#3a2b2b] ">
                <div className="flex">
                    <a href="/">
                        <div className="flex items-center cursor-pointer pr-[12px] border-r-2 border-[#665c5c]">
                            <p className="text-[12px] mr-[8px] font-semibold">Trang chủ</p>
                            <div className="hidden md:flex items-center">
                                <Home fontSize="small" />
                            </div>
                        </div>
                    </a>
                    <div className="flex items-center ml-[6px] px-[12px] border-r-2 border-[#665c5c]">
                        <p className="hidden md:block text-[12px] ml-[4px] px-[4px] font-semibold">Kết nối</p>
                        <div className="flex items-center mr-[12px] cursor-pointer">
                            <FacebookOutlined fontSize="small" className="ml-[5px]" />
                        </div>
                        <div className="flex items-center mr-[4px] cursor-pointer">
                            <Instagram fontSize="small" className="ml-[5px]" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    {context.active ? (
                        <>
                            <div className="flex items-center">
                                <p className="text-[14px] mr-[8px]">Xin chào {context.getLastName()}!</p>
                                <Avatar sx={{ width: "20px", height: "20px" }}>
                                    <Person fontSize="small" />
                                </Avatar>
                            </div>
                            <div>
                                <div
                                    className="flex items-center cursor-pointer ml-[28px]"
                                    onClick={context.handleLogout}>
                                    <Logout fontSize="small" />
                                    <p className="hidden sm:block text-[12px] ml-[8px]">Đăng xuất</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <div className="flex items-center cursor-pointer">
                                    <div className="hidden sm:flex items-center mr-[4px] cursor-pointer">
                                        <Person fontSize="small" />
                                    </div>
                                    <p className="text-[12px] ml-[8px] font-semibold">Đăng nhập</p>
                                </div>
                            </Link>
                            <Link to="/signup">
                                <div className="flex items-center cursor-pointer ml-[28px]">
                                    <div className="hidden sm:flex items-center mr-[4px] cursor-pointer">
                                        <PersonAdd fontSize="small" />
                                    </div>
                                    <p className="text-[12px] ml-[8px] font-semibold">Đăng kí</p>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div
                className={`flex ${
                    context.admin ? "justify-center" : "justify-between"
                } items-center mt-[34px] px-[20px] md:px-[108px] pt-[10px] pb-[4px] bg-gradient-to-b from-[#3a2b2b] to-[#433c36]`}>
                <Link to="/">
                    <div className="cursor-pointer flex items-center text-white">
                        <img src={logo} alt="logo" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                        <p className="hidden lg:block font-bold ml-[20px] text-[32px] text-[#75bde4] font-serif">
                            HBOOK
                        </p>
                    </div>
                </Link>
                <div className={`${context.admin ? "hidden" : "block"} relative`}>
                    <input
                        type="text"
                        className="md:w-[300px] lg:w-[400px] sm:py-[2px] md:py-[5px] pl-[12px] pr-[36px] outline-none"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div
                        className={`absolute top-[0px] right-[0px] cursor-pointer bg-[#ccc] px-[8px] xs:py-[0px] sm:py-[2px] md:py-[4px]`}
                        onClick={handleSearch}>
                        <Search sx={{ width: { xs: "18px", md: "23px" }, height: { xs: "18px", md: "23px" } }} />
                    </div>
                </div>
                <div className={`${context.admin ? "hidden" : "block"} text-white cursor-pointer`} onClick={handleCart}>
                    <AddShoppingCart
                        sx={{
                            width: { xs: "18px", sm: "24px", md: "32px" },
                            height: { xs: "18px", sm: "24px", md: "32px" },
                        }}
                    />
                </div>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Muốn xem giỏ hàng?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Để xem giỏ hàng xin vui lòng đăng nhập!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Không xem</Button>
                        <Button
                            onClick={() => {
                                setOpen(false);
                                navigate("/login");
                            }}
                            autoFocus>
                            Đăng nhập
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Nav;
