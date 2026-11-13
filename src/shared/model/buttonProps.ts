export interface IButtonProps {
    className?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}
