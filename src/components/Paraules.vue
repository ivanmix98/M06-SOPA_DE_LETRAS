<template>
  <div class="hello">

    <li v-for="paraula in paraules">
      {{ paraula}}
    </li>

    <transition name="bounce">
      <div v-show="show3" id="contenidoSopaDeLletres"></div>
    </transition>

    <input v-on:click="soluciona" v-show="show3" type="button" id="soluciona" value="Solució"/>
    <input v-on:click="jugar" type="button" id="jugar" value="jugar"/>
    <button v-show="show3" v-on:click="show = !show">Veure Creadors</button>
    <button v-show="show3" v-on:click="show2 = !show2">
      Mode Senzill
    </button>

    <transition name="slide-fade">
      <div v-show="show2" id="sopaDeLletres"></div>
    </transition>

    <transition name="bounce">
      <p v-if="show">Ivan Fontclara i Joan Garcia</p>
    </transition>

  </div>

</template>

<script>
  import json from '../assets/paraules'
  localStorage.setItem('paraules', JSON.stringify(json));
  var palabras = json;

  export default{
    data(){
      return{
        paraules: "",
        show: false,
        show2:false,
        show3: false
      }
    },
    name: 'app',
    methods: {
      jugar: function() {
        this.show3 = !this.show3;
        wordfindgame.create(palabras, '#contenidoSopaDeLletres', '#sopaDeLletres');
      },
      soluciona: function () {
        var gamePuzzle = wordfindgame.create(palabras, '#contenidoSopaDeLletres', '#sopaDeLletres');
        wordfindgame.solve(gamePuzzle, palabras);
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

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  /* Las animaciones de entrada y salida pueden utilizar */
  /* diferentes funciones y duraciones                   */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
