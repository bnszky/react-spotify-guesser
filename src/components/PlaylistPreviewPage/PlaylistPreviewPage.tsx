import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SongPagesDisplayer from '../SongPagesDisplayer/SongPagesDisplayer';
import InputSelectNumber from '../InputSelectNumber/InputSelectNumber';
import MainCenteredWindow from '../MainCenteredWindow/MainCenteredWindow';

const PlaylistPreviewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const minNumberOfQuestions = 5;

    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [playlistData, setPlaylistData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(minNumberOfQuestions);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/playlist/test`);
                setPlaylistData(response.data);
                console.log(response.data);
                if (response.data.tracks.length < minNumberOfQuestions) {
                    setError('The playlist does not have enough songs to play the game.');
                    setStatus('error');
                }
                else {
                    setNumberOfQuestions(Math.floor(response.data.tracks.length/2));
                }
                setStatus('success');
            } catch (error: any) {
                if (error.response) {
                    setError(error.response.data.message);
                    setStatus('error');
                } else {
                    setError('An error occurred while fetching the playlist.');
                    setStatus('error');
                }
            }
        };

        fetchPlaylist();
    }, [id]);

    useEffect(() => {
        if(status == 'error'){
            navigate('/', { state: { error: error } });
        }
    }, [status]);

    return (
        <>
            {status === 'loading' && <div className='h-screen flex items-center justify-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>}
            {status === 'error' && <p>{error}</p>}
            {status === 'success' && (
                <div className='flex flex-col gap-3 p-3 items-center'>
                    <MainCenteredWindow width="w-1/2">
                        <h1 className="text-3xl text-primary text-center">Preview of {playlistData.name}</h1>
                        <InputSelectNumber text="Number of questions: " minValue={minNumberOfQuestions} maxValue={playlistData.tracks.length} value={numberOfQuestions} onChange={setNumberOfQuestions} />
                        <button className="btn btn-primary w-">Start Game</button>
                    </MainCenteredWindow>
                    <SongPagesDisplayer tracks={playlistData.tracks} />
                </div>
            )}
        </>
    );
};

export default PlaylistPreviewPage;