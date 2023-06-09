import React, { useContext, useEffect, useState } from "react";
import Cart from "../components/Cart";
import Nav from "../components/Nav";
import { LoginContext } from "../context/LoginProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AddBusiness, ArrowForwardIos } from "@mui/icons-material";

const ShoppingCart = () => {
    const navigate = useNavigate();
    const context = useContext(LoginContext);

    const [carts, setCarts] = useState();
    useEffect(() => {
        if (context.active === false) {
            navigate("/");
        }
        const getCart = async () => {
            await axios.get(`http://localhost:8080/api/cart/${context.user.id}`).then((e) => {
                setCarts(e.data);
                console.log(e.data);
            });
        };
        getCart();
    }, [context.active, carts]);
    return (
        <>
            <Nav />
            <div className="bg-[#78909c] p-[36px]">
                <div className="max-w-[1200px] mx-[auto] mb-[10px]">
                    <Link to="/">Home</Link>
                    <ArrowForwardIos sx={{ fontSize: "14px", margin: "0px 5px" }} />
                    <p className="inline-block">Shopping Cart</p>
                </div>
                <div className="max-w-[1200px] mx-[auto] min-h-[80vh] bg-[#201a1a] rounded-[4px] pb-[30px]">
                    <div className="text-[24px] md:text-[40px] uppercase text-center text-[#5dd6eb] font-bold pt-[20px] font-serif">
                        <p>Giỏ hàng</p>
                    </div>
                    {carts ? (
                        <div className="text-[#fff] mx-[20px] md:mx-[40px] pt-[40px]">
                            <div className="float-right">{carts.length} sản phẩm trong giỏ</div>
                            {carts.map((cart, index) => (
                                <div key={cart.id} className="pt-[40px]">
                                    <Cart data={cart} index={index} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-[14px] md:text-[24px] text-center text-[#fff] font-semibold pt-[20px] font-serif">
                            <p>
                                Hiện tại chưa có sản phẩm nào trong giỏ hàng. Mời bạn lựa chọn thêm! <AddBusiness />
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;
