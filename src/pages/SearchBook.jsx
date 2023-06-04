import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Book from "../components/Book/Book";
import { CircularProgress } from "@mui/material";

const SearchBook = () => {
    const { bookQuery } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const findBook = async () => {
            await axios
                .get(`http://localhost:8080/api/book/findBook/${bookQuery}`)
                .then((e) => {
                    setBooks(e.data);
                })
                .then(() => {
                    setLoading(false);
                });
        };
        findBook();

        return () => {
            setLoading(true);
        };
    }, []);
    return (
        <>
            <div
                className={`${
                    loading ? "block" : "hidden"
                } w-full h-[100vh] flex items-center justify-center text-[50px] bg-[#201a1a]`}>
                <CircularProgress />
            </div>
            <div className={`${loading ? "hidden" : "block"}`}>
                <Nav />
                <div className={`bg-[#78909c] p-[36px]`}>
                    <div className="max-w-[1200px] mx-[auto] min-h-[80vh] bg-[#201a1a] rounded-[4px]">
                        <div className="block text-[32px] font-semibold text-white pl-[18px] py-[20px]">
                            Sách có tên chứa từ khóa <p className="inline-block text-[#42e3e5]">{bookQuery}</p>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 lg:gap-3 px-[4px] pb-[30px]">
                            {books.length !== 0 ? (
                                books.map((book) => (
                                    <div key={book.id} className="flex justify-center w-full overflow-hidden">
                                        <Link to={`/book/${book.id}`}>
                                            <Book data={book} />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-[20px] text-[#42e3e5]">
                                    Không tìm thấy cuốn sách có tên chứa {bookQuery}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default SearchBook;
