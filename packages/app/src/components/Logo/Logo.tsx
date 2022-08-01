import React from "react";
import { ReactComponent } from "./logo.svg";

export type LogoProps = React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
};

export const Logo: React.FC<LogoProps> = (props) => (
    <ReactComponent {...props} />
);
