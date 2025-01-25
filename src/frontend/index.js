import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Form from "./page/Form";
import Signup from "./page/Signup";
import Signin from "./page/Signin";

const container = document.getElementById("app");
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/form" element={<Form />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
        </Routes>
    </BrowserRouter>
);