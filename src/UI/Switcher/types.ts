export interface IProps {
    switched: boolean
    onSwithOn: () => void
    onSwithOff: () => void
    action?: string
    disabled?: boolean
    className?: string
}