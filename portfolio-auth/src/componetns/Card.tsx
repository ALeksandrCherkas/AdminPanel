import React from "react";

interface CardProps {
    title: string;
    children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
    return (
        <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}>


            <h4 style={{marginBottom: '10px'}}>{title}</h4>
            {children}
        </div>
    );
}

export default Card;