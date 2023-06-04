import BookModifier from "../pages/BookModifier";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SearchBook from "../pages/SearchBook";
import Signup from "../pages/Signup";
import ViewBook from "../pages/ViewBook";

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/", component: Home },
    { path: "/bookModifier/:id", component: BookModifier },
    { path: "/book/:id", component: ViewBook },
    { path: "/book/find/:bookQuery", component: SearchBook },
];

export { publicRoutes };
