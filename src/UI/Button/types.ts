export enum EButtonVariants {
    Primary,
    Secondary,
}

export enum EButtonSize {
    Big = 'big',
    Small = 'small',
}

export interface ButtonProps {
    isActive?: boolean
    //We don't use variants anymore
    variants?: EButtonVariants;
    size?: EButtonSize;
    className?: string
    href?: string
    disabled?: boolean
}