import {colors} from "../../../styles/colors";

export interface TextProps {
    color?: typeof colors[keyof typeof colors];
    fontSize?: string;
    bold?: boolean;
}