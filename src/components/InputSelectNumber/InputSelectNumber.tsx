import React from 'react';

interface InputSelectNumberProps {
    text: string;
    minValue: number;
    maxValue: number;
    value: number;
    onChange: (value: number) => void;
}

const InputSelectNumber: React.FC<InputSelectNumberProps> = ({ text, minValue, maxValue, value, onChange }) => {
    return (
        <>
        <div className='text-lg text-primary text-center'>{text} {value}</div>
        <input type="range" min={minValue} max={maxValue} value={value} className="range" step="1" onChange={(e) => onChange(Number(e.target.value))} />
        </>
    );
};

export default InputSelectNumber;