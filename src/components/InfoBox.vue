<template>
    <transition appear name="from-bottom">
      <div class="info-box" v-if="$store.state.infoType > 0" :class="[$store.state.infoType == 1 ? 'info-error' : 'info-success']">
        <p class="info-text">{{ $store.state.infoStatus }}</p>
      </div>
    </transition>
</template>

<script>

export default {
  name: 'InfoBox',
  components: {

  }
}
</script>

<style>
@keyframes enter {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 100;
  }
}

.from-bottom-enter-active {
  animation: enter 0.3s
}

.from-bottom-leave-active {
  animation: enter reverse 0.3s
}

.from-bottom-enter, .from-bottom-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.info-box {
  width: 500px;
  height: 50px;
  margin: 30px auto;
  border-radius: 20px;
  text-align: center;
  margin-top: 10px;
}
.info-error {
  background-color: rgba(255, 0, 0, 0.5);
}
.info-success {
  background-color: rgba(0, 128, 0, 0.5);
}

.info-text {
  color: white;
  font-size: 20px;
  padding-top: 12px;
}
</style>
