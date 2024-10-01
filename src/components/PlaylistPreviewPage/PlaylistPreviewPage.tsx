import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TrackItem from '../TrackItem/TrackItem';
import SongPagesDisplayer from '../SongPagesDisplayer/SongPagesDisplayer';

const PlaylistPreviewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [playlistData, setPlaylistData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/playlist/${id}`);
                setPlaylistData(response.data);
                console.log(response.data);
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

    return (
        <>
            {status === 'loading' && <div className='h-screen flex items-center justify-center'>
                <h2>Loading...</h2>
            </div>}
            {status === 'error' && <p>{error}</p>}
            {status === 'success' && (
                <div className='flex flex-col gap-3 p-3'>

                    <h2>Your songs: </h2>
                    <SongPagesDisplayer tracks={playlistData} />
                </div>
            )}
        </>
    );
};

export default PlaylistPreviewPage;