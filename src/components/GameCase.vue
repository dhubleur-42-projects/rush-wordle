<template>
    <div class="game-case" :class="[$store.state.response[rowId][letterId] == 'G' ? 'okay-case' : $store.state.response[rowId][letterId] == 'Y' ? 'inword-case' : $store.state.response[rowId][letterId] == 'B' ? 'false-case' : '']">
      <p class="case-letter">{{ $store.state.words[rowId][letterId] }}</p>
    </div>
</template>

<script>

export default {
  name: 'GameCase',
  components: {
    
  },
  props: ['rowId', 'letterId']
}
</script>

<style>
.game-case
{
    width: 100px;
    height: 100px;
    border: solid 2px white;
    margin-top: 20px;
    transition: background-color 1s ease-in
}
.case-letter
{
  font-size: 55px;
  font-weight: 800;
  margin-top: 17px;
  color: white;
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes flip2 {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

.okay-case {
  background-color: #68ab65;
  animation: flip ease-in-out 1s;
}
.okay-case .case-letter {
  animation: flip2 ease-in-out 1s;
}
.inword-case {
  background-color: #c9b556;
  animation: flip ease-in-out 1s;
}
.inword-case .case-letter {
  animation: flip2 ease-in-out 1s;
}
.false-case {
  background-color: #797d7f;
  animation: flip ease-in-out 1s;
}
.false-case .case-letter {
  animation: flip2 ease-in-out 1s;
}
</style>
