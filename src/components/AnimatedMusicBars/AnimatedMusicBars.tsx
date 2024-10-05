import React from 'react';
import './AnimatedMusicBars.css';

interface AnimatedMusicBarsProps {
    numBars: number;
    isPlaying: boolean;
  }
  
const AnimatedMusicBars: React.FC<AnimatedMusicBarsProps> = ({ numBars, isPlaying }) => {
    return (
        <div className={`icon ${isPlaying ? 'playing' : 'paused'}`}>
        {Array.from({ length: numBars }).map((_, index) => (
            <span key={index} style={{ animationDelay: `${-index * 0.55}s` }}></span>
        ))}
        </div>
    );
};

export default AnimatedMusicBars;