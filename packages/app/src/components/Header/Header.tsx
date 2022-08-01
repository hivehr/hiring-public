import { TopNav, TopNavProps } from "bumbag";
import React from "react";
import { Logo } from "../Logo/Logo";

export const Header: React.FC<TopNavProps> = (props) => (
    <TopNav height="80px" borderBottom="1px solid #eee" {...props}>
        <TopNav.Section>
            <TopNav.Item href="/">
                <Logo height="50px" />
            </TopNav.Item>
        </TopNav.Section>
    </TopNav>
)
