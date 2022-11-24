import React, {useEffect, useState} from 'react';
import './App.css';
import Scoreboard from './components/scoreboard';
import Cards from './components/cards';
import logo from './images/doge-logo.png';
import { dogeImages } from './images/doge';

const App = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [images, setImages] = useState([...dogeImages.slice(0, level * 5)]);
  const [chosenImages, setChosenImages] = useState([]);

  useEffect(() => {
    setImages([...dogeImages.slice(0, level * 5)]);
    setChosenImages([]);
  }, [level]);

  const shuffle = () => {
      const array = [...dogeImages.slice(0, level * 5)];
      let newArray = [];
      console.log('hello');

      for (let i = level * 5; i > 0; i--) {
          const index = generateRandomIndex(array);
          const element = array[index];
          array.splice(index, 1);
          newArray.push(element);
      }
      setImages([...newArray]);
      console.log(images);
  }

  const generateRandomIndex = (array) => {
      const min = Math.ceil(0);
      const max = Math.floor(array.length);
      const index = Math.floor(Math.random() * (max - min) + min);
      return index;
  }


  useEffect(() => {
    updateBestScore();
    updateLevel();
    shuffle();
  }, [score]);

  const updateScore = (id) => {
    const obj = findObj(id);
    console.log(obj);
    let exists = false;

    for(let i = 0; i < chosenImages.length; i++) {
      if (obj.id === chosenImages[i].id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      setScore(0);
      setChosenImages([]);
    }else {
      setChosenImages([...chosenImages, obj]);
      setScore(score + 1);
    }
  }

  const findObj = (id) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        return images[i];
      }
    }
  }

  const updateBestScore = () => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }

  const updateLevel = () => {
    if (score == 0) {
      setLevel(1);
    }
    if (score === 5 || score === 15) {
      setLevel(level + 1);
    }
  }
  
  const winningDiv = <div className='winningDiv'>
    <p>You Win!</p>
    <button onClick={() => setScore(0)}>Restart</button>
  </div>

  return (
    <div className="app">
      {score === 30 ? winningDiv : null}
      <header className='top-container'>
        <h1>Doge-Memory</h1>
        <img className='logo' src={logo}/>
        <Scoreboard score={score} bestScore={bestScore}/>
      </header>
      <div className='bottom-container'>
        <h2>Level: {level}</h2>
        <Cards updateScore={updateScore} images={images}/>
      </div>
    </div>
  );
}

export default App;
