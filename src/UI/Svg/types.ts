import { SVGAttributes } from "react";

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
}


export interface IDisableSvg extends SvgProps{
    disabled?:boolean,
}
