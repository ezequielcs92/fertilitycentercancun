import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', id }) => {
    return (
        <div
            id={id}
            className={`container mx-auto px-6 md:px-12 ${className}`}
        >
            {children}
        </div>
    );
};
