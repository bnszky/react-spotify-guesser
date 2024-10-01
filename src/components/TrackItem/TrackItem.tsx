import React, {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface TrackItemProps {
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    image: string;
    preview_url: string;
  };
  onClick: () => void;
}

const TrackItem = ({ track, onClick }: TrackItemProps) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener('timeupdate', updateProgress);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newProgress = Number(event.target.value);
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(newProgress);
    }
  };

  return <div className="card card-side bg-neutral shadow-xl px-5">
    <figure>
      <img
      src={track.image}
      alt={`image for ${track.name}`}
      className="rounded-lg h-32 w-32 object-cover" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{track.name}</h2>
      <p>{track.artists.join(", ")}</p>
      <audio ref={audioRef} src={track.preview_url} />
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>
      <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full mt-2"
        />
    </div>
  </div>
}

export default TrackItem;