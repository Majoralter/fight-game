<template>
  <div class="interface">
    <div class="user-fighter">
      Hello World!
    </div>

    <div class="cpu-fighter">
      
    </div>
  </div>
</template>

<script>
import fighters from '/data/fighters';
import fetchUser from '@/composables/fetchUser';
import { onMounted, ref } from 'vue';
export default {
  name: 'NewFight',
 
  setup() {
    onMounted(async () =>{
      let data = await fetchUser()


    })

    const cpuFighter = ref(null)
  }
}
</script>

<style lang="scss" scoped>

</style>

