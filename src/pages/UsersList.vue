<template>
  <button type="button" @click="confirmInput">Confirm</button>
  <button type="button" @click="saveChanges">Saved Chnages </button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data(){
    return {changesSaved:false};
  },
  methods :{
    confirmInput(){

      debugger
      // speacia router property
      this.$router.push('/teams')
    },
    saveChanges(){
      this.changesSaved = true
    }
  },



  beforeRouteEnter(to,from,next){
    console.log("componennt level hook ")
      console.log(to,from);
      next();
  },


  // not to accedentally loose the data .
  beforeRouteLeave(to,from,next){
    debugger;
    console.log(to);
    console.log(from);

    if(this.changesSaved){
      next()
    }else {
      const userAction = confirm("Are you sure ? you got unsaved chnages !");
      next(userAction)
    }

  }


};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>