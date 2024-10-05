import MainCenteredWindow from "../MainCenteredWindow/MainCenteredWindow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimatedMusicBars from "../AnimatedMusicBars/AnimatedMusicBars";
import SearchInput from "../SearchInput/SearchInput";
import axios from "axios";
import SongTile from "../SongTile/SongTile";

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    image: string;
    preview_url: string;
}

const QuizPage = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedSong, setSelectedSong] = useState("");
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [error, setError] = useState<string | null>(null);
    const [songs, setSongs] = useState<string[]>([]);
    const [quizSongs, setQuizSongs] = useState<Track[]>([]);
    const [number, setNumber] = useState(5);
    const [progress, setProgress] = useState(0);

    const [isSelected, setIsSelected] = useState<boolean>(false)

    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const numberParam = queryParams.get('number');
        if (numberParam) {
            setNumber(parseInt(numberParam));
        }
    }, [location.search]);

    useEffect(() => {
        if(status == 'error'){
            navigate('/', { state: { error: error } });
        }
    }, [status]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/quiz/${id}?number=${number}`);
                setQuizSongs(response.data['tracks']);
                setSongs(response.data["nameOfAllSongs"])
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

        fetchSongs();
    }, [number]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.volume = 0.1;
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
            if (!audio.src) {
                audio.src = quizSongs[currentQuestion].preview_url;
            }
            audio.play();
          }
          setIsPlaying(!isPlaying);
        }
      };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        const progressBar = document.getElementById("song-duration") as HTMLProgressElement;
        if (audio && progressBar) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        const progressBar = document.getElementById("song-duration") as HTMLProgressElement;
        if (progressBar) {
            progressBar.value = 0;
        }
    };

    const checkAnswer = () => {
        let message = "Incorrect";
        console.log(selectedSong);
        if (selectedSong === quizSongs[currentQuestion].name) {
            message = "Correct";
        }

        alert(message);
        setIsSelected(true);
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        console.log(selectedSong);
    }, [selectedSong]);

    const nextQuestion = () => {
        if (currentQuestion < number-1) {
            setCurrentQuestion(currentQuestion+1);
            setIsSelected(false);
            setSelectedSong("");
            if (audioRef.current) {
                audioRef.current.src = quizSongs[currentQuestion + 1].preview_url;
            }
        }
        else {
            alert("Quiz finished");
            navigate('/');
        }
    }

    return ( <>
        {status === 'loading' && <div className='h-screen flex items-center justify-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>}
        {status === 'error' && <p>{error}</p>}
        {status === 'success' && (
        <div className='h-screen flex items-center justify-center'>
            <MainCenteredWindow>
                <h2 className="text-2xl font-bold text-white text-center text-primary">Your score</h2>
                <h1 className="font-bold text-white text-primary">Song {currentQuestion + 1}</h1>
                <progress className="progress progress-primary w-full" value={currentQuestion+1} max={number}></progress>
                {isSelected && <SongTile track={quizSongs[currentQuestion]} />}
                {!isSelected && <><AnimatedMusicBars numBars={10} isPlaying={isPlaying}/>
                <button className="btn btn-primary" onClick={togglePlay}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <progress className="progress progress-primary w-full" id="song-duration" value={progress} max="100"></progress>

                <SearchInput choices={songs} value={selectedSong} onChange={setSelectedSong} /></>}

                {!isSelected && <button className="btn btn-primary" onClick={checkAnswer}>
                    Check
                </button> || <button className="btn btn-primary" onClick={nextQuestion}>
                    Next
                </button>}
                <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                />
            </MainCenteredWindow>
        </div>)}
        </>
    );
};

export default QuizPage;