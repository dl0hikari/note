import React from 'react';

interface SourceCodeProps{
    children: any
}

const SourceCode = ({ children }: SourceCodeProps) => {
    return (
        <pre>{children}</pre>
    );
};

export default SourceCode;
