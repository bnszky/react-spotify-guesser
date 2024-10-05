import React from 'react';

interface SongTileProps {
    track: {
        id: String;
        name: string;
        artists: { name: string }[];
        image: string;
        preview_url: string;
    };
};

const SongTile: React.FC<SongTileProps> = ({ track }) => {
    return (
        <div className="card card-side bg-base-100 shadow-xl px-5">
            <figure>
                <img
                src={track.image}
                alt={track.name} 
                style={{width: 90, height: 90}}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{track.name}</h2>
                <p>{track.artists.join(",")}</p>
            </div>
        </div>
    );
}

export default SongTile;