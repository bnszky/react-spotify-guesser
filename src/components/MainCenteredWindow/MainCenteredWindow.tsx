import React, { ReactNode } from 'react';

interface MainCenteredWindowProps {
    children: ReactNode;
}

const MainCenteredWindow: React.FC<MainCenteredWindowProps> = ({ children }) => {
    return <div className="bg-neutral p-6 flex flex-col gap-6 rounded-lg shadow-lg">{children}</div>;
};

export default MainCenteredWindow;