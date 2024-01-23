<template>
  <div v-if="userDetails.isRegistered" class="select-screen">
    <div class="header">
      <p>ID: {{ userDetails.id }}</p>
      <p><strong>{{ userDetails.name }}</strong></p>
      <p>{{ userDetails.userName }}</p>
      <p><strong>{{ userDetails.credits }} credits</strong></p>
    </div>

    <div class="select-menu" v-if="userFighters.length < 2">
      <h1>Select two fighters</h1>

      <div class="fighters">
        <div class="fighter-option" v-for="fighter in fighterOptions" :key="fighter.id" :disabled="isOptionsDisabled"
          @click="() => {
            addUserFighters(fighter.id)
            clickSound.play()
          }" @mouseover="hoverSound.play()">
          <img :src="require(`../assets/${fighter.class}.jpeg`)" alt="">
          <p><strong>ID: {{ fighter.id }}</strong></p>
          <h1>Class: {{ fighter.class }}</h1>
          <p>Ability: {{ fighter.ability }}</p>
        </div>
      </div>
    </div>

    <div v-else class="placeholder">
      <div v-if="!isNewFightStarted">
        <p>
          Selections saved! Check your fighters tab for selected fighters
        </p>

        <button @click="() => {
          isNewFightStarted = !isNewFightStarted
        }">Start a new fight!</button>
      </div>

      <div v-else>
        <p><strong>Choose your fighter for this round</strong></p>
        <div class="fighters">
          <div class="fighter-option" v-for="fighter in userFighters" :key="fighter.id" @mouseover="hoverSound.play()"
            @click="clickSound.play()">
            <img :src="require(`../assets/${fighter.class}.jpeg`)" alt="">
            <p><strong>ID: {{ fighter.id }}</strong></p>
            <h1>Class: {{ fighter.class }}</h1>
            <p>Ability: {{ fighter.ability }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <form @submit.prevent="registerUser" v-else>
    <label for="userName">Your name <input type="text" placeholder="Enter your name" id="userName" autocomplete="off"
        v-model="userName" required></label>
    <label for="userUsername">Username <input type="text" placeholder="Enter your preferred username" id="userUsername"
        autocomplete="off" v-model="userUsername" required></label>
    <button>Generate profile</button>
  </form>
</template>

<script>
import { onMounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import fighters from '../../data/fighters'
import updateUser from '../composables/updateUser'
import NewFight from '@/components/NewFight.vue';

export default {
  name: 'HomeView',
  components: {
    NewFight
  },

  setup() {
    onMounted(() => {
      if (JSON.parse(localStorage.getItem('playerFightGame')) !== null) {
        userDetails.value = JSON.parse(localStorage.getItem('playerFightGame'))

        if (JSON.parse(localStorage.getItem('playerFighters')) !== null) {
          userFighters.value = JSON.parse(localStorage.getItem('playerFighters'))
        }
      }
    }
    )

    const isRegistered = ref(false),
      userName = ref(''),
      userUsername = ref('')
    let userDetails = ref({}),
      fighterOptions = ref(fighters),
      userFighters = ref([]),
      isOptionsDisabled = ref(false),
      isNewFightStarted = ref(false),
      hoverSound = new Audio(require('../assets/audio/hover-click.mp3')),
      clickSound = new Audio(require('../assets/audio/clicked.mp3'))


    const registerUser = () => {
      isRegistered.value = !isRegistered.value
      userDetails.value = {
        id: uuidv4(),
        name: userName.value,
        userName: userUsername.value,
        isRegistered: true,
        credits: 100
      }

      localStorage.setItem('playerFightGame', JSON.stringify(userDetails.value))
    }

    const addUserFighters = (fighterId) => {
      fighterOptions.value.forEach(fighter => {
        if (fighterId === fighter.id) {
          userFighters.value.push(fighter)
        }
      })

      if (userFighters.value.length === 2) {
        isOptionsDisabled.value = true
        updateUser({
          user: userDetails.value,
          fighters: userFighters.value
        })

        localStorage.setItem('playerFighters', JSON.stringify(userFighters.value))
        return
      }

    }

    return { isRegistered, userName, userUsername, userDetails, userFighters, registerUser, fighterOptions, isOptionsDisabled, addUserFighters, isNewFightStarted, hoverSound, clickSound }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  flex-direction: column;

  label {
    font-size: 20px;

    input {
      padding: 8px 20px;
    }
  }

  button {
    padding: 8px 12px;
    cursor: pointer;
  }
}

.select-screen {
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-inline: 50px;
  }

  .select-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;

    .fighters {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      gap: 20px;
      max-width: 90dvw;

      .fighter-option {
        cursor: pointer;
        width: 300px;
        padding: 10px;
        border-radius: 1rem;
        background-color: #ddd;
        transition: all 300ms ease-in-out;

        img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem 1rem 0 0;
        }

        &:hover {
          scale: .95;
          background-color: #ccc;
        }
      }
    }
  }

  .placeholder {
    padding: 20px;

    p {
      color: #111;
    }

    button {
      margin-top: 20px;
      padding: 12px 24px;
    }

    .fighters {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
      max-width: 90dvw;
      margin: 30px auto;

      .fighter-option {
        cursor: pointer;
        width: 250px;
        padding: 10px;
        border-radius: 1rem;
        background-color: #ddd;
        transition: all 300ms ease-in-out;

        img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem 1rem 0 0;
        }

        h1 {
          font-size: 1rem;
        }

        &:hover {
          scale: .95;
          background-color: #ccc;
        }
      }
    }
  }
}
</style>
