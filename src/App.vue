<template>
  <div id="app">
    <game></game>
  </div>
</template>

<script>
import Game from './components/Game'

export default {
  name: 'app',
  components: { Game },
  data () {
    return {
      msg: 'Hello, World!!'
    }
  }
}
</script>

<style lang="scss">
</style>
