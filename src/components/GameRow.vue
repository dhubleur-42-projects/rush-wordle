<template>
    <div class="game-row">
        <GameCase :rowId="rowId" letterId="0"></GameCase>
        <GameCase :rowId="rowId" letterId="1"></GameCase>
        <GameCase :rowId="rowId" letterId="2"></GameCase>
        <GameCase :rowId="rowId" letterId="3"></GameCase>
        <GameCase :rowId="rowId" letterId="4"></GameCase>
    </div>
</template>

<script>
import GameCase from './GameCase'

export default {
  name: 'GameRow',
  components: {
    GameCase
  },
  props: ['rowId']
}
</script>

<style>
.game-row
{
    width: 550px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
}
</style>
