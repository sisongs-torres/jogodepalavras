const WORD_BANK = {
  animais: ['PANDA', 'TIGRE', 'ZEBRA', 'GATO', 'PEIXE', 'PAVAO', 'LEBRE', 'AGUIA'],
  comida: ['PIZZA', 'PASTA', 'TORTA', 'MELAO', 'BISCO', 'SALSA', 'PUDIM', 'CACAU'],
  ciencia: ['ATOMO', 'TERRA', 'MUNDO', 'RADAR', 'SOLAR', 'METAL', 'FUSAO', 'QUARK', 'ONDAS'],
  esportes: ['VOLEI', 'TENIS', 'GOLFE', 'JUDO', 'RUGBY', 'BOLAO', 'POLOS', 'NADOS']
};

const categories = ['animais', 'comida', 'ciencia', 'esportes'];
const STORAGE_KEYS = {
  stats: 'jardim-palavras-stats',
  active: 'jardim-palavras-active'
};

const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const board = document.getElementById('board');
const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const themeLabel = document.getElementById('themeLabel');
const streakValue = document.getElementById('streakValue');
const startCategory = document.getElementById('startCategory');
const gameCategory = document.getElementById('gameCategory');
const attemptsLeft = document.getElementById('attemptsLeft');
const wordLength = document.getElementById('wordLength');
const resultTitle = document.getElementById('resultTitle');
const resultSummary = document.getElementById('resultSummary');
const finalCategory = document.getElementById('finalCategory');
const finalWord = document.getElementById('finalWord');
const finalAttempts = document.getElementById('finalAttempts');

const winsValue = document.getElementById('winsValue');
const gamesValue = document.getElementById('gamesValue');
const bestStreakValue = document.getElementById('bestStreakValue');
const winRateValue = document.getElementById('winRateValue');
const modeButtons = document.querySelectorAll('.mode-btn');

const defaultStats = {
  wins: 0,
  games: 0,
  streak: 0,
  bestStreak: 0,
  lastWord: '',
  winRate: 0
};

const state = {
  currentCategory: 'animais',
  selectedCategory: 'animais',
  dailyWord: '',
  currentGuess: '',
  guesses: [],
  guessHistory: [],
  isFinished: false,
  didWin: false,
  hasStarted: false
};

function normalizeWord(value) {
  return value.toUpperCase().replace(/[^A-Z]/g, '');
}

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function pickDailyCategory(dateKey) {
  const seed = Array.from(dateKey).reduce((total, char) => total + char.charCodeAt(0), 0);
  return categories[seed % categories.length];
}

function pickDailyWord(category, dateKey) {
  const words = WORD_BANK[category] || [];
  const index = Array.from(dateKey).reduce((total, char) => total + char.charCodeAt(0), 0) % words.length;
  return words[index];
}

function getStats() {
  const raw = localStorage.getItem(STORAGE_KEYS.stats);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(defaultStats));
    return { ...defaultStats };
  }

  try {
    return { ...defaultStats, ...JSON.parse(raw) };
  } catch (error) {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(defaultStats));
    return { ...defaultStats };
  }
}

function saveStats(stats) {
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
}

function formatCategoryLabel(category) {
  const labels = {
    animais: 'Animais',
    comida: 'Comida',
    ciencia: 'Ciência',
    esportes: 'Esportes'
  };

  return labels[category] || category;
}

function getDailyState(category = state.selectedCategory || 'animais') {
  const todayKey = getTodayKey();
  const storageValue = localStorage.getItem(STORAGE_KEYS.active);
  const active = storageValue ? JSON.parse(storageValue) : {};
  const chosenCategory = category || 'animais';

  if (!active.date || active.date !== todayKey || active.category !== chosenCategory) {
    const word = pickDailyWord(chosenCategory, todayKey);
    const nextActive = {
      date: todayKey,
      category: chosenCategory,
      word,
      guesses: [],
      isFinished: false,
      didWin: false,
      currentGuess: '',
      hasStarted: false
    };
    localStorage.setItem(STORAGE_KEYS.active, JSON.stringify(nextActive));
    return nextActive;
  }

  return {
    ...active,
    hasStarted: Boolean(active.hasStarted)
  };
}

function renderStats() {
  const stats = getStats();
  winsValue.textContent = stats.wins;
  gamesValue.textContent = stats.games;
  bestStreakValue.textContent = stats.bestStreak;
  winRateValue.textContent = `${stats.winRate}%`;
  streakValue.textContent = stats.streak;
}

function showScreen(screen) {
  [startScreen, gameScreen, resultScreen].forEach((node) => {
    node.classList.toggle('active', node === screen);
  });
}

function updateBoard() {
  board.innerHTML = '';

  const maxAttempts = 6;
  for (let rowIndex = 0; rowIndex < maxAttempts; rowIndex += 1) {
    const row = document.createElement('div');
    row.className = 'row';

    for (let cellIndex = 0; cellIndex < state.dailyWord.length; cellIndex += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      const guess = state.guessHistory[rowIndex];
      if (guess) {
        const letter = guess[cellIndex];
        cell.textContent = letter;
        cell.classList.add('filled');
        const result = evaluateGuess(guess, state.dailyWord)[cellIndex];
        cell.classList.add(result);
      } else if (rowIndex === state.guessHistory.length) {
        cell.classList.add('filled');
      }

      if (rowIndex === state.guessHistory.length && state.currentGuess[cellIndex]) {
        cell.textContent = state.currentGuess[cellIndex];
        cell.classList.add('filled');
      }

      row.appendChild(cell);
    }

    board.appendChild(row);
  }
}

function evaluateGuess(guess, secret) {
  const result = Array(secret.length).fill('absent');
  const secretChars = secret.split('');
  const remaining = [];

  for (let index = 0; index < guess.length; index++) {
    if (guess[index] === secretChars[index]) {
      result[index] = 'correct';
    } else {
      remaining.push({ index, char: secretChars[index] });
    }
  }

  for (let index = 0; index < guess.length; index++) {
    if (result[index] !== 'correct') {
      const matchIndex = remaining.findIndex((item) => item.char === guess[index]);
      if (matchIndex !== -1) {
        result[index] = 'present';
        remaining.splice(matchIndex, 1);
      }
    }
  }

  return result;
}

function updateAttempts() {
  const remaining = 6 - state.guessHistory.length;
  attemptsLeft.textContent = String(Math.max(remaining, 0));
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? '#a6352a' : '#123128';
}

function updateTheme() {
  const label = formatCategoryLabel(state.currentCategory || state.selectedCategory || 'animais');
  themeLabel.textContent = label;
  startCategory.textContent = label;
  gameCategory.textContent = label;
  wordLength.textContent = state.dailyWord.length;

  const modePalette = {
    animais: { hero: '#edf8f1', accent: '#1f7d5d', badge: '#e5f7ee' },
    comida: { hero: '#fff4ef', accent: '#ee6c47', badge: '#ffe9df' },
    ciencia: { hero: '#eef2ff', accent: '#4a5ed7', badge: '#e7ebff' },
    esportes: { hero: '#fff8ea', accent: '#d98d2d', badge: '#fff0cf' }
  };

  const palette = modePalette[state.selectedCategory] || modePalette.animais;
  document.querySelector('.hero-card').style.background = `linear-gradient(180deg, ${palette.hero} 0%, #ffffff 100%)`;
  document.querySelector('.status-badge').style.background = palette.badge;
  document.querySelector('.status-badge').style.color = palette.accent;
  document.querySelector('.dot').style.background = palette.accent;
}

function updateModeButtons() {
  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === state.selectedCategory;
    button.classList.toggle('active', isActive);
  });
}

function startNewGame(category = state.selectedCategory) {
  const current = getDailyState(category);
  state.selectedCategory = category;
  state.currentCategory = current.category;
  state.dailyWord = current.word;
  state.currentGuess = '';
  state.guessHistory = current.guesses || [];
  state.isFinished = Boolean(current.isFinished);
  state.didWin = Boolean(current.didWin);
  state.hasStarted = true;

  if (state.isFinished) {
    resultTitle.textContent = state.didWin ? 'Você venceu!' : 'Hoje não foi dessa vez';
    resultSummary.textContent = state.didWin
      ? `Você descobriu a palavra do dia em ${state.guessHistory.length} tentativas.`
      : `A palavra correta era ${state.dailyWord}. Tente novamente amanhã.`;
    finalCategory.textContent = state.currentCategory;
    finalWord.textContent = state.dailyWord;
    finalAttempts.textContent = String(state.guessHistory.length);
    showScreen(resultScreen);
    return;
  }

  storeActiveState();
  guessInput.value = '';
  guessInput.maxLength = state.dailyWord.length;
  updateTheme();
  updateAttempts();
  updateBoard();
  hideResult();
  showScreen(gameScreen);
  guessInput.focus();
}

function hideResult() {
  message.textContent = '';
}

function storeActiveState() {
  localStorage.setItem(
    STORAGE_KEYS.active,
    JSON.stringify({
      date: getTodayKey(),
      category: state.currentCategory,
      word: state.dailyWord,
      guesses: state.guessHistory,
      isFinished: state.isFinished,
      didWin: state.didWin,
      currentGuess: state.currentGuess,
      hasStarted: state.hasStarted
    })
  );
}

function endGame(won) {
  state.isFinished = true;
  state.didWin = won;
  storeActiveState();

  const stats = getStats();
  stats.games += 1;
  if (won) {
    stats.wins += 1;
    stats.streak += 1;
    stats.lastWord = state.dailyWord;
  } else {
    stats.streak = 0;
  }
  stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
  stats.winRate = stats.games ? Math.round((stats.wins / stats.games) * 100) : 0;
  saveStats(stats);
  renderStats();

  resultTitle.textContent = won ? 'Você venceu!' : 'Hoje não foi dessa vez';
  resultSummary.textContent = won
    ? `Você descobriu a palavra do dia em ${state.guessHistory.length} tentativas.`
    : `A palavra correta era ${state.dailyWord}. Tente novamente amanhã.`;
  finalCategory.textContent = state.currentCategory;
  finalWord.textContent = state.dailyWord;
  finalAttempts.textContent = String(state.guessHistory.length);

  showScreen(resultScreen);
}

function submitGuess() {
  if (state.isFinished) {
    return;
  }

  const guess = normalizeWord(guessInput.value);
  if (!guess) {
    setMessage('Digite uma palavra antes de enviar.', true);
    return;
  }

  if (guess.length !== state.dailyWord.length) {
    setMessage(`A palavra precisa ter ${state.dailyWord.length} letras.`, true);
    return;
  }

  const validWords = WORD_BANK[state.currentCategory] || [];
  if (!validWords.some((word) => word === guess)) {
    setMessage('Essa palavra não está no banco permitido.', true);
    return;
  }

  if (state.guessHistory.includes(guess)) {
    setMessage('Você já tentou essa palavra.', true);
    return;
  }

  state.guessHistory.push(guess);
  state.currentGuess = '';
  storeActiveState();
  updateBoard();
  updateAttempts();
  guessInput.value = '';
  setMessage('');

  if (guess === state.dailyWord) {
    endGame(true);
    return;
  }

  if (state.guessHistory.length >= 6) {
    endGame(false);
  }
}

function handleKeyInput(key) {
  if (state.isFinished) {
    return;
  }

  if (key === 'BACKSPACE') {
    state.currentGuess = state.currentGuess.slice(0, -1);
    guessInput.value = state.currentGuess;
    return;
  }

  if (key === 'CLEAR') {
    state.currentGuess = '';
    guessInput.value = '';
    return;
  }

  const nextValue = normalizeWord(state.currentGuess + key);
  if (nextValue.length <= state.dailyWord.length) {
    state.currentGuess = nextValue;
    guessInput.value = nextValue;
  }
}

document.getElementById('startButton').addEventListener('click', () => {
  startNewGame(state.selectedCategory);
});

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.selectedCategory = button.dataset.mode;
    state.currentCategory = state.selectedCategory;
    updateModeButtons();
    updateTheme();
    startCategory.textContent = formatCategoryLabel(state.selectedCategory);
  });
});

document.getElementById('playAgainButton').addEventListener('click', () => {
  const current = getDailyState(state.currentCategory || state.selectedCategory);
  state.currentCategory = current.category;
  state.selectedCategory = current.category;
  state.dailyWord = current.word;
  state.guessHistory = [];
  state.currentGuess = '';
  state.isFinished = false;
  state.didWin = false;
  state.hasStarted = true;
  storeActiveState();
  guessInput.value = '';
  updateTheme();
  updateModeButtons();
  updateAttempts();
  updateBoard();
  showScreen(gameScreen);
  guessInput.focus();
});

document.getElementById('shareButton').addEventListener('click', async () => {
  const result = `Hoje joguei no Jardim das Palavras e usei ${state.guessHistory.length} tentativa(s)!`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Jardim das Palavras',
        text: result
      });
      return;
    } catch (error) {
      // fallback for the copy action
    }
  }

  try {
    await navigator.clipboard.writeText(result);
    setMessage('Resultado copiado para a área de transferência.');
  } catch (error) {
    setMessage('Seu navegador não permitiu copiar automaticamente.', true);
  }
});

document.getElementById('guessForm').addEventListener('submit', (event) => {
  event.preventDefault();
  submitGuess();
});

document.querySelectorAll('.key').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    const action = button.dataset.action;
    if (key) {
      handleKeyInput(key);
      return;
    }
    if (action === 'clear') {
      handleKeyInput('CLEAR');
    }
    if (action === 'backspace') {
      handleKeyInput('BACKSPACE');
    }
  });
});

guessInput.addEventListener('input', (event) => {
  const value = normalizeWord(event.target.value);
  if (value.length <= state.dailyWord.length) {
    state.currentGuess = value;
    event.target.value = value;
  } else {
    event.target.value = state.currentGuess;
  }
});

function init() {
  const current = getDailyState(state.selectedCategory);
  const stats = getStats();

  state.selectedCategory = current.category || state.selectedCategory;
  state.currentCategory = current.category || state.selectedCategory;
  state.dailyWord = current.word;
  state.guessHistory = current.guesses || [];
  state.currentGuess = current.currentGuess || '';
  state.isFinished = Boolean(current.isFinished);
  state.didWin = Boolean(current.didWin);
  state.hasStarted = Boolean(current.hasStarted);

  updateModeButtons();
  renderStats();
  updateTheme();
  updateAttempts();
  updateBoard();

  if (state.isFinished) {
    showScreen(resultScreen);
    resultTitle.textContent = state.didWin ? 'Você venceu!' : 'Hoje não foi dessa vez';
    resultSummary.textContent = state.didWin
      ? `Você descobriu a palavra do dia em ${state.guessHistory.length} tentativas.`
      : `A palavra correta era ${state.dailyWord}. Tente novamente amanhã.`;
    finalCategory.textContent = state.currentCategory;
    finalWord.textContent = state.dailyWord;
    finalAttempts.textContent = String(state.guessHistory.length);
    return;
  }

  if (!state.hasStarted) {
    showScreen(startScreen);
  } else {
    showScreen(gameScreen);
  }

  if (stats.streak) {
    streakValue.textContent = stats.streak;
  }
}

init();
