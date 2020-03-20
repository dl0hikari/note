import * as React from 'react';
import { render } from 'react-dom';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    onChange? : () => void;
}

class Input<InputProps>{
    render() {
        return (
            <input type="text"/>
        );
    }
}

export default Input;
