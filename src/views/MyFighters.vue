
<template>
  <div class="fighters">
  <div v-for="(fighter, index) in userFighters" :key="index">
    <img :src="require(`../assets/${fighter.class}.jpeg`)" alt="">
    <p><strong>ID: {{ fighter.id }}</strong></p>
    <h1>Class: {{ fighter.class }}</h1>
    <p>Ability: {{ fighter.ability }}</p>
  </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import fetchUser from '@/composables/fetchUser'

export default {
  name: 'MyFighters',

  setup() {
    onMounted(async () => {
      let data = await fetchUser()

      userFighters.value = data[0].fighters
    })

    const userFighters = ref([])

    return { userFighters }
  }
}
</script>

<style lang="scss" scoped>
.fighters{
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 70dvw;
  flex-wrap: wrap;
  gap: 20px;

  div{
    max-width: 200px;
    background-color: #ddd;
    border-radius: .75rem;
    padding: 10px;

    img{
      max-width: 100%;
      height: auto;
      border-radius: .75rem .75rem 0 0;
    }

    h1{
      font-size: 1rem;
    }
  }
}
</style>

