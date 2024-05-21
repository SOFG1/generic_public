export const card_size = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};
export type CardSize = typeof card_size[keyof typeof card_size];
export interface CardProps {
    size?: CardSize;
}