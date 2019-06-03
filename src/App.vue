<template>
  <div id="app">
    <game></game>
    <credit></credit>
  </div>
</template>

<script>
import Game from './components/Game'
import Credit from './components/Credit'

export default {
  name: 'app',
  components: { Game, Credit }
}
</script>

<style>
</style>
