<template>
    <button class="restart-button" @mousedown="restart">Restart</button>
</template>

<script>

export default {
  name: 'RestartButton',
  components: {
    
  },
  methods: {
      restart() {
          this.$store.dispatch('resetGame');
      }
  }
}
</script>

<style>
.restart-button {
  width: 200px;
  height: 50px;
  margin-top: 15px;
  font-size: 30px;
  background-color: gray;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.restart-button:hover {
  border: 2px solid white;
}
</style>
