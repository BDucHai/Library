import axios from "axios";
import React, { useEffect, useState } from "react";
import Book from "./Book/Book";
import { Link } from "react-router-dom";

const HomeUser = () => {
    const [books, setBooks] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            await axios.get("http://localhost:8080/api/books").then((e) => {
                setBooks(e.data);
            });
        };
        fetchBook();
        return () => {
            setUpdate(false);
        };
    }, [update]);
    return (
        <div className="bg-[#78909c] p-[36px]">
            <div className="max-w-[1200px] mx-[auto] min-h-[80vh] bg-[#201a1a] rounded-[4px]">
                <div className="block text-[32px] font-semibold text-white pl-[18px] py-[20px]">Sách mới cập nhật</div>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 lg:gap-3 px-[4px] pb-[30px]">
                    {books.length !== 0 &&
                        books.map((book) => (
                            <div key={book.id} className="flex justify-center w-full overflow-hidden">
                                <Link to={`/book/${book.id}`}>
                                    <Book data={book} />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomeUser;
