import React from "react";
import MainCenteredWindow from "../MainCenteredWindow/MainCenteredWindow";

const WelcomePage: React.FC = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <MainCenteredWindow>
                <h2 className="text-2xl font-bold text-white text-center">Paste link to your playlist</h2>
                <input type="text" placeholder="Your link" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-secondary">Search</button>
            </MainCenteredWindow>
        </div>
    );
};

export default WelcomePage;