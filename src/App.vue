<template>
  <h1 class="game-title">WORDLE</h1>
  <GameGrid></GameGrid>
  <RestartButton></RestartButton>
  <InfoBox></InfoBox>
  <KeyBoard class="keyboard-comp"></KeyBoard>
</template>

<script>
import GameGrid from './components/GameGrid'
import InfoBox from './components/InfoBox'
import RestartButton from './components/RestartButton'
import KeyBoard from './components/Keyboard.vue'

export default {
  name: 'App',
  components: {
    GameGrid,
    InfoBox,
    RestartButton,
    KeyBoard
  }
}
</script>

<style>
body {
  background-color: #1B2A37;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game-title {
  color: white;
}

.keyboard-comp {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  height: 200px;
}
</style>
