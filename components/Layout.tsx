/* eslint-disable prettier/prettier */
import React from "react";
import { ReactNode } from "react";
import Header from "@components/Header";

const Layout = (props: { children: ReactNode }) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )
};

export default Layout;
