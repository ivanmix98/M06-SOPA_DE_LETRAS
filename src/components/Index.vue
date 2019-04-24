<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <transition name="fade">
      <p v-if="show">Aquest joc consisteix en el clasic joc de la sopa de lletres, troba totes les paraules per a poder guanyar el joc. Si tens dificultat
      per completarlo, prova a premer el boto de "Mode Senzill"</p>
    </transition>
    <button class="btn btn-dark" v-on:click="show = !show">
      Mostra Informació
    </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Home Sopa de Lletres',
      show: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
