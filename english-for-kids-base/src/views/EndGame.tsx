import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IState } from '../models/app';
import { resetGame } from '../redux/actions';
import { playAudio } from '../utils';

function EndGame({ isSuccessful }: { isSuccessful: boolean }): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    playAudio(`../../public/audio/${isSuccessful ? 'success' : 'failure'}.mp3`);
    setTimeout(() => {
      dispatch(resetGame());
      history.push('/');
    }, 4000);
  }, []);

  const mistakes = useSelector((state: IState) => state.game.game.mistakes);

  return (
    <main className="cards-container end-game">
      {isSuccessful ? <h2>You did it!</h2> : <h2>Oh no...</h2>}
      {isSuccessful ? null : <p>You have made {mistakes} mistakes</p>}
      <img src={`../../public/${isSuccessful ? 'happy' : 'angry'}.png`} alt="Game end" />
    </main>
  );
}

export default EndGame;
