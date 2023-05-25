import BookModifier from "../pages/BookModifier";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ViewBook from "../pages/ViewBook";

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/", component: Home },
    { path: "/bookModifier/:id", component: BookModifier },
    { path: "/book/:id", component: ViewBook },
];

export { publicRoutes };
