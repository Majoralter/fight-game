<template>
  <nav>
    <router-link to="/" exact>Home</router-link>
    <router-link to="/shop">Shop</router-link>
    <router-link to="/my-fighters">My fighters</router-link>
  </nav>
  <router-view/>
</template>

<script>
import "./Sass/app.scss"

export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav{
  max-width: 350px;
  margin: 20px auto 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a{
    color: black;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 50px;
    transition: all 300ms ease-in-out ;

    &.router-link-active{
      color: white;
      background-color: #2c3e50;
    }
  }
}
</style>
