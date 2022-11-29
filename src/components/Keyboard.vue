<template>
    <div class="keyboard">
        <div v-for="line in $store.state.keyboardLine" :key="line[0].key" class="keyboard-line">
            <KeyboardKey v-for="key in line" :key="key.key" :letter="key.key" :color="key.type"></KeyboardKey>
        </div>
    </div>
</template>

<script>
import KeyboardKey from './Key'

export default {
  name: 'KeyBoard',
  components: {
      KeyboardKey
  }
}
</script>

<style>
.keyboard-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 auto;
    width: 50%;
    margin-top: 10px;
}
</style>
