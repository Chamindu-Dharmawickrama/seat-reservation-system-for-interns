import React from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const Layouts = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main >{children }</main>
            <Footer />
        </div>
    );
};
