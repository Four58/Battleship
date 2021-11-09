import { useEffect, useState } from "react";
import niceMusic from "../../assets/music.mp3";


const useAudio = () => {
  const [audio] = useState(new Audio(niceMusic));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [audio, playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Music = () => {
  const [playing, toggle] = useAudio();

  return <button onClick={ toggle }>{ playing ? "pause" : "play" }</button>;
};
export default Music;
