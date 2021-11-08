import { useEffect, useState } from "react";
import niceMusic from "../../assets/music.mp3";

const audio = new Audio(niceMusic);

const Music = () => {
  const [songPlaying, setSongPlaying] = useState(true);

  // useEffect(() => {
  //   audio.play();
  //   // console.log("2");
  //   return () => {
  //     audio.pause();
  //     // console.log("1");
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log(songPlaying);
  //   if (songPlaying) {
  //     console.log("start");
  //     audio.play();
  //   } else {
  //     console.log("pause");
  //     audio.pause();
  //   }
  // }, [songPlaying]);

  const songToggleHandler = () => {
    // setSongPlaying((prev) => !prev);
    // console.log(songPlaying);
    // if (songPlaying) {
    //   console.log("start");
    //   audio.play();
    // } else {
    //   console.log("pause");
    //   audio.pause();
    // }
  };

  return <button onClick={songToggleHandler}>Play/Pause</button>;
};
export default Music;
