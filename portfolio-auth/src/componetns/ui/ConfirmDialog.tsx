import Modal from "./Modal";

interface Props {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({isOpen, title, message, onConfirm, onCancel}: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel} style={{ background: "red", color: "white" }}>Cancel</button>
            </div>
            
        </Modal>
    )
}

export default ConfirmDialog;