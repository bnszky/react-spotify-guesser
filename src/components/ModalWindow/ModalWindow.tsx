import React from 'react';

interface ModalWindowProps {
    id: string;
    text: string;
    title: string;
    color: string;
    textColor: string;
};

const ModalWindow: React.FC<ModalWindowProps> = ({ id, text, title, color, textColor }) => {
  return (
    <dialog id={id} className="modal">
        <div className={`modal-box bg-${color} text-${textColor}`}>
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className={`font-bold text-lg text-${textColor}`}>{title}</h3>
            <p className={`py-4 text-${textColor}`}>{text}</p>
        </div>
    </dialog>
  );
}

export default ModalWindow;