<template>
  <div class="hello">

    <li v-for="paraula in paraules">
      {{ paraula.paraula.toUpperCase().split("")}}
    </li>
  </div>
</template>

<script>
  import json from '../assets/paraules'
  localStorage.setItem('paraules', JSON.stringify(json));

  let data = { paraules : "paraula", lletres : []};

  for (let i in json) {
    var letras = json[i].paraula.split("");
    console.log("Paraula:" + json[i].paraula + " Lletres: " + json[i].paraula.toUpperCase().split(""));
  }

  export default{
    data(){
      return{
        paraules: json
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
</style>
