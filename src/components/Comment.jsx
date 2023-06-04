import { Avatar, Box, Button, Menu, MenuItem, Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import { LoginContext } from "../context/LoginProvider";
import { Star } from "@mui/icons-material";
import axios from "axios";

const labels = {
    1: "Tệ",
    2: "Nhàm chán",
    3: "Ổn",
    4: "Hay",
    5: "Rất hay",
};

const Comment = ({ comment }) => {
    const context = useContext(LoginContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteComment = async (commentId) => {
        handleClose();
        await axios
            .delete(`http://localhost:8080/api/book/${bookId}/react/${commentId}`, {
                params: {
                    userId: context.user.id,
                },
            })
            .then((e) => {
                setUpdate(true);
            })
            .catch((e) => {
                setNoticeComment("Không thể xóa vì bạn không phải người viết đánh giá này!");
                setAlertNotice(true);
            });
    };
    return (
        <div key={comment.id} className="flex justify-between pt-[10px] pb-[14px] px-[6px] md:px-[24px]">
            <div className="flex">
                <div className="mr-[10px] md:mr-[20px]">
                    <Avatar
                        sx={{
                            width: { xs: "20px", md: "40px" },
                            height: { xs: "20px", md: "40px" },
                            cursor: "pointer",
                        }}>
                        {comment.username[0].toUpperCase()}
                    </Avatar>
                </div>
                <div>
                    <p className="font-semibold text-[12px] md:text-[16px] mb-[4px] text-[#2b2fc1] cursor-pointer">
                        {comment.username}
                    </p>
                    <div className="flex">
                        <Rating
                            value={comment.voted}
                            readOnly
                            emptyIcon={<Star style={{ opacity: 0.6, color: "#000" }} fontSize="inherit" />}
                        />
                        {comment.voted !== null && (
                            <Box className="ml-[10px] font-semibold mt-[2px]">{labels[comment.voted]}</Box>
                        )}
                    </div>
                    <p className="mt-[4px]">{comment.message}</p>
                    <div className="font-semibold mt-[4px]">
                        <span className="mr-[68px] ">{comment.time}</span>
                        <span>{comment.date}</span>
                    </div>
                </div>
            </div>
            {context.active && (
                <div className="float-left">
                    <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{ backgroundColor: "#f7f1f1" }}
                        onClick={handleClick}>
                        ...
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}>
                        <MenuItem onClick={handleClose} sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                            Sửa
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleDeleteComment(comment.id)}
                            sx={{ fontSize: { xs: "12px", md: "14px" } }}>
                            Xóa
                        </MenuItem>
                    </Menu>

                    <Dialog
                        open={alertNotice}
                        onClose={() => setAlertNotice(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">{noticeComment}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setAlertNotice(false)} autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default Comment;
