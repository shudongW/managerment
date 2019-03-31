<template>
  <div id="app">
      <!--<div class="nav">-->
        <!--<ul>-->
          <!--<li><router-link to="/hello" >hello</router-link></li>-->
          <!--<li><router-link to="/index" >index</router-link></li>-->
          <!--<li><router-link to="/login" >login</router-link></li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<div class="main">-->
        <router-view></router-view>
      <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }
    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
  }

}

</script>

<style>
body{
  background-color: aquamarine;
  font-family: 'Avenir' ,Arial;
  }
</style>
