<template>
  <div @click="addLetter" class="key" :class="[color == 'N' ? 'not-tested' : color == 'G' ? 'okay' : color == 'Y' ? 'in-the-word' : 'not-in']">
      <p>{{ letter }}</p>
  </div>
</template>

<script>

export default {
  name: 'KeyboardKey',
  components: {
   
  },
  props: ['letter', 'color'],
  methods: {
    addLetter() {
      if(this.$store.state.words[this.$store.state.currentRow].length < 5)
        this.$store.state.words[this.$store.state.currentRow] = this.$store.state.words[this.$store.state.currentRow].concat(this.letter);
    }
  }
}
</script>

<style>
.key {
  width: 50px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: background-color 1.3s ease-in
}

.not-tested {
   background-color: #2f2f30;
}
.okay {
  background-color: #68ab65
}
.in-the-word {
  background-color: #c9b556;
}
.not-in{
   background-color: #797d7f;
}
</style>
