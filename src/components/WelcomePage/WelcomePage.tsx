import React, { useState, useEffect } from "react";
import MainCenteredWindow from "../MainCenteredWindow/MainCenteredWindow";
import { useLocation, useNavigate } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (location.state?.error) {
            setError(location.state.error as string);
            const modal = document.getElementById('error-modal');
            (modal as HTMLDialogElement)?.showModal();
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    return (
        <>
        <div className='h-screen flex items-center justify-center'>
            <MainCenteredWindow>
                <h2 className="text-2xl font-bold text-white text-center">Paste link to your playlist</h2>
                <input type="text" placeholder="Your link" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-secondary">Search</button>
            </MainCenteredWindow>
        </div>

        <ModalWindow id="error-modal" title="Error" text={error + "! Please Try again" } color="error" textColor="black" />
        </>
    );
};

export default WelcomePage;