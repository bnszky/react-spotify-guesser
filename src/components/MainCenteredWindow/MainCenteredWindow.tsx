import React, { ReactNode } from 'react';

interface MainCenteredWindowProps {
    children: ReactNode;
    width?: string;
}

const MainCenteredWindow: React.FC<MainCenteredWindowProps> = ({ children, width=null }) => {
    return <div className={`bg-neutral p-6 flex flex-col gap-6 rounded-lg shadow-lg ${width}`}>{children}</div>;
};

export default MainCenteredWindow;