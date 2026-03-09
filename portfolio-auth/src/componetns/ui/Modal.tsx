import type { ReactNode } from "react";

interface Props{
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal ({isOpen, onClose, children}: Props) {
    if (!isOpen) return null;

    return (
        <div style = {overlayStyle} onClick={onClose}>
            <div
                style={modalStyle}
                onClick={(e)=> e.stopPropagation()}
                >
                    {children}
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
};

export default Modal;