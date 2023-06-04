import React from "react";

import { logo } from "../images";
import {
    ArrowCircleUpTwoTone,
    Email,
    FacebookOutlined,
    FmdGood,
    Instagram,
    Phone,
    Pinterest,
    Twitter,
    YouTube,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
const Footer = () => {
    const handleToTop = () => {
        document.documentElement.scrollTop = 0;
    };
    return (
        <div className="w-full md:flex justify-between bg-gradient-to-b from-[#33282a] to-[#3f2929] px-[20px] md:px-[40px] lg:px-[100px] pt-[24px] pb-[34px] text-[10px] md:text-[13px] text-[#f6efef] bg-[#3a2b2b] ">
            <div className="w-full md:w-[30%] md:pr-[10px] border-r-0 md:border-r-2 border-r-[#554848]">
                <a href="/">
                    <img src={logo} alt="" className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] mb-[20px]" />
                </a>
                <p>
                    HBOOK nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại
                    văn phòng cũng như tất cả Hệ Thống HBOOK trên toàn quốc.
                </p>
                <div className="mt-[16px]">
                    <FacebookOutlined sx={{ fontSize: "30px", cursor: "pointer", marginRight: "8px" }} />
                    <Instagram sx={{ fontSize: "30px", cursor: "pointer", marginRight: "8px" }} />
                    <YouTube sx={{ fontSize: "30px", cursor: "pointer", marginRight: "8px" }} />
                    <Twitter sx={{ fontSize: "30px", cursor: "pointer", marginRight: "8px" }} />
                    <Pinterest sx={{ fontSize: "30px", cursor: "pointer" }} />
                </div>
            </div>
            <div className="w-full md:w-[70%] mt-[20px] md:mt-0 md:ml-[40px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <span className="uppercase text-[14px] md:text-[18px] font-semibold">Dịch vụ</span>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Dịch vụ điều khoản sử dụng</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chính sách bảo vệ thông tin</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chính sách bảo mật thanh toán</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Hệ thống trung tâm nhà sách</p>
                    </div>
                    <div>
                        <span className="uppercase text-[14px] md:text-[18px] font-semibold">Hỗ trợ</span>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chính sách đổi trả hoàn tiền</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chính sách bảo hành</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chính sách khách sỉ</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chính sách vận chuyển</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">
                            Phương thức thanh toán và xuất HĐ
                        </p>
                    </div>
                    <div>
                        <span className="uppercase text-[14px] md:text-[18px] font-semibold">Tài khoản của tôi</span>
                        <Link to="/login">
                            <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Đăng nhập/tạo tài khoản mới</p>
                        </Link>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Thay đổi địa chỉ khách hàng</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Chi tiết TK</p>
                        <p className="hover:text-[#31c9c1] cursor-pointer my-[18px]">Lịch sử mua hàng</p>
                    </div>
                </div>
                <div className="mt-[12px]">
                    <span className="uppercase text-[14px] md:text-[18px] font-semibold">Liên hệ</span>
                    <div className="block md:flex justify-between mt-[12px]">
                        <div className="flex items-center mt-[8px] md:mt-0">
                            <FmdGood />
                            <p>An Hòa, Hà Đông, Hà Nội</p>
                        </div>
                        <div className="flex items-center mt-[8px] md:mt-0">
                            <Email />
                            <p>bduchai258@gmail.com</p>
                        </div>
                        <div className="flex items-center mt-[8px] md:mt-0">
                            <Phone />
                            <p>19002543</p>
                        </div>
                    </div>
                </div>
                <div className="mt-[10px] md:mt-[30px] text-right">
                    <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{ color: "#fff", "&:hover": { backgroundColor: "#796060" } }}
                        onClick={handleToTop}>
                        <ArrowCircleUpTwoTone fontSize="inherit" sx={{ width: "40px", height: "40px" }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Footer;
