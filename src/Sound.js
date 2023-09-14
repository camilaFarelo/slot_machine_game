import { useEffect } from "react";
import useSound from "use-sound";
import audioFile from './media/ringtones-super-mario-bros.mp3';

export default function Sound(props) {
  const [play, {stop}] = useSound(audioFile, {loop: true});

  useEffect(() => {
    if (!props.showWinner) {
      play();
    } else {
      stop();
    }
  }, [play, stop, props.showWinner]);
  return null;
}