import { useState, useEffect } from "react";

const useAudio = (music) => {
  const [audio] = useState(new Audio(music));
  const [playing, setPlaying] = useState(true);

  //   const toggle = () => setPlaying(!playing);
  useEffect(() => {
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, setPlaying];
};

export default useAudio;
