import React from "react";

export interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    isHiddenClose?: boolean
    className?: string
    stopBubbling?: boolean,
    preventCloseOnClickOutside?:boolean
}
