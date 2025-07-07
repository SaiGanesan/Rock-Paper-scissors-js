let playerScore = 0;
let computerScore = 0;

const pScore = document.getElementById('playerScore');
const cScore = document.getElementById('computerScore');
const playerSelect = document.getElementById('playerSelect');
const computerSelect = document.getElementById('computerSelect');
const message = document.getElementById('message');

function computerPlay() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(player, computer) {
  if (player === computer) return 'Draw!';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'Player won!';
  return 'Computer won!';
}

function displaySelection(type, move) {
  const el = type === 'player' ? playerSelect : computerSelect;
  el.innerHTML = `<i class="fas fa-hand-${move}"></i>`;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

function animateResult(result) {
  if (result === 'Player won!') {
    playerSelect.classList.add('win');
    computerSelect.classList.add('lose');
  } else if (result === 'Computer won!') {
    computerSelect.classList.add('win');
    playerSelect.classList.add('lose');
  }

  setTimeout(() => {
    playerSelect.classList.remove('win', 'lose');
    computerSelect.classList.remove('win', 'lose');
  }, 600);
}

function updateScore(result) {
  if (result === 'Player won!') playerScore++;
  if (result === 'Computer won!') computerScore++;
  pScore.textContent = playerScore;
  cScore.textContent = computerScore;
}

function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    message.textContent = playerScore === 5 ? '🎉 You Win!' : '😢 You Lost!';
    setTimeout(resetGame, 3000);
    return true;
  }
  return false;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  pScore.textContent = '0';
  cScore.textContent = '0';
  message.textContent = 'Play Again!';
  playerSelect.innerHTML = '';
  computerSelect.innerHTML = '';
}

function playGame(playerMove) {
  const computerMove = computerPlay();
  displaySelection('player', playerMove);
  displaySelection('computer', computerMove);

  const result = playRound(playerMove, computerMove);
  message.textContent = result;
  animateResult(result);
  updateScore(result);
  checkWinner();
}

document.getElementById('rock').onclick = () => playGame('rock');
document.getElementById('paper').onclick = () => playGame('paper');
document.getElementById('scissors').onclick = () => playGame('scissors');

function toggleInstructions() {
  const box = document.getElementById('instructions');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
