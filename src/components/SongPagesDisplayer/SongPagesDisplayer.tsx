import React, {useEffect, useState} from "react";
import TrackItem from "../TrackItem/TrackItem";

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    image: string;
    preview_url: string;
}

interface SongPagesDisplayerProps {
    tracks: Track[];
}

const SongPagesDisplayer: React.FC<SongPagesDisplayerProps> = ({ tracks }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentTracks, setCurrentTracks] = useState<Track[]>([]);
    const maxTracksOnScreen = 5;

    const totalPages = Math.ceil(tracks.length / maxTracksOnScreen);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const getTracksOnPage = () => {
        const startIndex = (currentPage - 1) * maxTracksOnScreen;
        const endIndex = Math.min(startIndex + maxTracksOnScreen, tracks.length);
        return tracks.slice(startIndex, endIndex);
    }

    useEffect(() => {
        setCurrentPage(1);
        setCurrentTracks(getTracksOnPage());
    }, [tracks]);

    useEffect(() => {
        setCurrentTracks(getTracksOnPage());
    }, [currentPage]);

    return (
        <div className="flex flex-col gap-3 p-3 w-3/4">
            <h2>Fetched {tracks.length} songs: </h2>
            {currentTracks.map((track: Track) => <TrackItem key={track.id} track={track} onClick={() => {}} />)}
            <div className="flex gap-3 justify-center my-5">
                <button
                className="join-item btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                >
                    «
                </button>
                <button className="join-item btn">
                    Page {currentPage}
                </button>
                <button
                    className="join-item btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default SongPagesDisplayer;