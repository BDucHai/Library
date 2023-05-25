import React from "react";

import classNames from "classnames/bind";
import styles from "./Book.module.scss";

const cx = classNames.bind(styles);
const Book = ({ data, width = "192px", height = "370px" }) => {
    return (
        <div className={cx("book")}>
            <div
                className={`inline-block cursor-pointer w-[110px] sm:w-[140px] md:w-[186px] h-[270px] md:h-[370px] text-white bg-[#1d1313] pt-[5px] rounded-[10px]`}>
                <div className="relative">
                    <div className={cx("tab")}>
                        <img
                            src={data.imgBook}
                            alt=""
                            className="rounded-[8px] mb-[10px] w-[100px] h-[146px] sm:w-[116px] md:w-[auto] sm:h-[160px] md:h-[260px] max-w-[180px]"
                        />
                    </div>
                </div>
                <div className={`block text-start text-[12px] md:text-[14px] px-[10px] truncate`}>
                    <span className="truncate">{data.title}</span>
                    <h4 className="text-[12px] md:text-[15px] font-semibold">{data.author}</h4>
                    <h4>Thể loại: {data.genre}</h4>
                    <p>Đã bán: {data.sold}</p>
                </div>
            </div>
        </div>
    );
};

export default Book;
