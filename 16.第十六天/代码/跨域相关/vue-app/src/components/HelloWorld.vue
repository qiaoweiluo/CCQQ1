<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
        <li v-for="item in aList" :key="item.id">
            {{ item.title }}
        </li>
    </ul>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      aList:[]
    }
  },
  mounted(){
      axios.get('/news').then(dat=>{
          //console.log(dat);
          this.aList = dat.data.body
      })
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
