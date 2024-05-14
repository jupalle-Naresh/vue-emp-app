<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go To Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {

  inject:["users","teams"],
  props:["teamid","sort"],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [
      ],
    };
  },

  methods:{
    loadTeamMembers(selectedTeamid){
      debugger
      // const selectedTeamid  =route.params.teamid;  
      // we would freffered to use the route as params instead of search with route object
      const selectedTeam  = this.teams.find(team => team.id === selectedTeamid);
      const selectedTeamMembers = [];
      for(let member of selectedTeam.members){
        const user = this.users.find(user => user.id === member);
        selectedTeamMembers.push(user);
      }

      this.teamName = selectedTeam.name;
      this.members = selectedTeamMembers;
    }
  },
  watch:{
      teamid(newid){
        debugger
        this.loadTeamMembers(newid)
      }
  },
  created(){
    this.loadTeamMembers(this.teamid);

    // *******  query parameters only acccessble with router not with props.
    console.log(this.sort)
    // releanit ------->  relesiant 
    // to access current url properties  $route
  },
  beforeRouteUpdate(_,_2,next){

    console.log("when component ")
    next();
    // view will call this method whenever this component
    //is about to be reused with new data,
    //because the route changed.
    // alternative to the watchers 
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>