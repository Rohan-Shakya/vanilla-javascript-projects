game = () => {
  const playerOne = document.querySelector('#playerOne');
  const playerTwo = document.querySelector('#playerTwo');

  // images for randon player 1 dice
  const play1 = Math.floor(Math.random() * 6) + 1;
  const play1dice = `img/dice${play1}.png`;
  playerOne.setAttribute('src', play1dice);
  playerOne.style.width = '200px';

  // images for randon player 2 dice
  const play2 = Math.floor(Math.random() * 6) + 1;
  const play2dice = `img/dice${play2}.png`;
  playerTwo.setAttribute('src', play2dice);
  playerTwo.style.width = '200px';

  // conditions
  if (play1 > play2) {
    document.querySelector('h1').innerHTML = 'Player1 won :)';
  } else if (play1 < play2) {
    document.querySelector('h1').innerHTML = 'Player2 won :)';
  } else {
    document.querySelector('h1').innerHTML = 'Draw';
  }
};
