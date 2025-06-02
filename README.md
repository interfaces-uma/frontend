# Código Secreto Web

A web-based implementation of the popular board game "Codenames" ("Código Secreto"), where two teams compete to identify their color-coded words using secret code hints provided by their teammates.

## Table of Contents
- [Overview](#overview)
- [Team](#team)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Game Rules](#game-rules)
- [Build and Deployment](#build-and-deployment)

## Overview

This is an online/local multiplayer game that recreates the "Codenames" board game experience. Players are divided into two teams (red and blue), each with a spymaster (leader) who provides one-word clues to help their team identify the correct words on the board while avoiding the opponent's words and the assassin card.

## Team

### Equipo L
- **Salma Boulagna Moreno** - CTO y CIO - salmabm0416@gmail.com
- **Carlos Rodríguez Martín** - COO - carlosrodriguezmartin2004@gmail.com
- **Miguel Ángel Dorado Maldonado** - CEO - miguelangeldorado10@gmail.com
- **José Ruiz Pareja** - CXO - joseruizparejaa@gmail.com

## Features

- **Online Multiplayer**: Play with friends remotely using real-time socket communication
- **Interactive Tutorial**: Learn how to play with a step-by-step guide
- **Team Management**: Join red or blue team as either a spymaster or field operative
- **Real-time Chat**: Communicate with your team members
- **Background Music & Sound Effects**: Immersive audio experience
- **Responsive Design**: Play on desktop or mobile devices

## Technology Stack

- **Frontend**:
  - React 19.1.0
  - TypeScript 5.8.2
  - React Router 7.5.0
  - Socket.IO Client 4.8.1 (for real-time multiplayer)
  - Tailwind CSS 4.1.3

- **Development Tools**:
  - RSBuild for build tooling
  - Biome for code formatting and linting
  - Husky for git hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/interfaces-uma/frontend
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000 by default.

## Project Structure

```
src/
├── assets/           # Static assets (images, sounds)
├── components/       # Reusable UI components
│   ├── Board.tsx     # Game board component
│   ├── Card.tsx      # Individual word card
│   └── ...           # Other UI components
├── context/          # React Context providers
│   ├── game/         # Game state management
│   └── Volume/       # Audio settings management
├── features/         # Feature-specific modules
│   ├── chat/         # Chat functionality
│   ├── lobby/        # Game lobby system
│   ├── online/       # Online multiplayer features
│   └── tutorial/     # Tutorial system
├── pages/            # Main application pages
└── types.ts          # TypeScript type definitions
```

## Development

### Available Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Creates a production build
- `npm run preview` - Previews the production build locally
- `npm run check` - Runs Biome check
- `npm run format` - Formats code using Biome

### State Management

The game uses React Context API for state management:

- `GameContext` - Manages the core game state including cards, teams, turns, and game logic
- `VolumeContext` - Handles audio settings

The main game reducer (`gameReducer.ts`) handles all game-related actions:
- Team and role selection
- Card reveals and selections
- Turn management
- Game state updates
- Chat messaging

### Socket Communication

Real-time multiplayer is implemented using Socket.IO. The socket connections are configured in the `socket.ts` file and handle:
- Room creation and joining
- Game state synchronization
- Player actions
- Chat messaging

## Game Rules

1. Players are divided into two teams: red and blue
2. Each team has a spymaster (leader) and field operatives (agents)
3. The board consists of 25 word cards with hidden colors
4. Spymasters know the colors of all cards
5. On a team's turn:
   - The spymaster gives a one-word clue and a number
   - The number indicates how many cards relate to the clue
   - Operatives try to guess cards of their team's color
   - If they reveal an opponent's card or the black assassin card, their turn ends
6. The first team to reveal all their cards wins
7. If a team reveals the assassin card, they lose immediately

## Build and Deployment

To create a production build:

```bash
npm run build
```

The built files will be available in the `dist` directory, ready for deployment to any static hosting service.


---

*Código Secreto is based on the original board game "Codenames" by Vlaada Chvátil.*
