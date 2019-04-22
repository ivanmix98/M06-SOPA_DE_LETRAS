<template>
  <div class="hello">

      <li v-for="lletra in lletres">
        {{ lletra}}
      </li>
  </div>
</template>

<script>
  import json from '../assets/paraules'
  localStorage.setItem('paraules', JSON.stringify(json));

  let p = [];
  let l = [];
  for (let i in json) {
    let paraula = json[i].paraula;
    let lletres = paraula.toUpperCase().split("");
    console.log("Paraula:" + paraula + " Lletres: " + json[i].paraula.toUpperCase().split(""));
    p.push({"paraula":paraula});

    for (let e in lletres) {
    l.push(lletres[e])
    }
  }

  export default{
    data(){
      return{
        paraules: p,
        lletres:  l
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
