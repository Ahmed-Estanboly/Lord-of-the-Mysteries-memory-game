# Tarot Memory Game

An atmospheric browser memory game inspired by Lord of the Mystries tarot cards. Reveal two cards at a time, remember their locations, and match every pair with the fewest moves and the best time possible.

## Features

- Three difficulty levels:
	- Easy: 12 cards, 6 pairs
	- Medium: 16 cards, 8 pairs
	- Hard: 20 cards, 10 pairs
- Randomized card layout on every game
- Timer that starts with the first card click
- Move counter and live score
- Card flip, match, mismatch, and victory audio effects
- Mute and unmute control
- Responsive tarot-inspired interface
- Local leaderboard storing the top five scores in `localStorage`
- Restart and return-to-menu controls

## How to Play

1. Enter a player name.
2. Choose a difficulty level.
3. Select **Start Game**.
4. Reveal two cards to look for a matching pair.
5. Matched cards stay revealed; unmatched cards turn face down again.
6. Continue until every pair has been found.
7. Save the final result to the leaderboard.

The score starts at 1,000 points and decreases with moves and elapsed time:

```text
Score = 1000 - (moves x 5) - (seconds x 2)
```

The score cannot fall below zero.

## Running the Game

This is a static browser project. Open `index.html` directly in a modern browser, or serve the folder with a local development server for the best results with audio and browser security restrictions.

For example, with VS Code, install the **Live Server** extension and choose **Open with Live Server** from `index.html`.

## Project Structure

```text
Memory game/
├── index.html          # Game screens and page structure
├── css/
│   └── style.css       # Layout, responsive styles, and animations
├── js/
│   ├── game.js         # Card setup, matching, timer, and scoring
│   ├── storage.js      # Leaderboard persistence with localStorage
│   └── ui.js            # Screen controls, rendering, audio, and interactions
├── audio/              # Sound effects and background music
├── img/                # Tarot card artwork and card back
└── readme.md           # Project documentation
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

## Data Storage

Leaderboard entries are saved in the browser under the `leaderboard` localStorage key. Scores remain available between visits in the same browser until the site data is cleared.

## Credits

Created as an interactive JavaScript student project focused on DOM manipulation, event handling, arrays, timers, audio, responsive CSS, and browser storage.
