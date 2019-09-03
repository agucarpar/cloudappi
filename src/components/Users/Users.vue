<template >
<div>
    <h1>My Users</h1>
<div class="wrapper-div">
        <div v-for="user in users" v-bind:key="user.id" class="user-div"> 
            <div v-if="editUser===user.id">
                <input v-model="user.name" /> 
                <input v-model="user.email"/>
                <button v-on:click="updateUser(user)">Save</button>
            </div>
            <div v-else>
                <p>Name: {{user.name}} </p> 
                <p>Email: {{user.email}} </p>
            </div>
            <div>
                <button v-on:click="editUser=user.id">Edit User</button>
                <button v-on:click="deleteUser(user.id)">Delete User</button>
            </div>
        </div>
</div>
<div class="new-user-btn">
        <div>
        <button v-on:click="newUser = true">Add New User</button>
        </div>
            <div v-if="newUser === true">
                <input v-model="username" placeholder="Name of new user"/>
                <input v-model="usermail" placeholder="Email of new User"/>
                <input v-model="userid" placeholder="Id number"/>
                
                <div> 
                    <button v-on:click="addUser(username, usermail, userid)">Save</button>
                </div>   
            </div>
</div>
    
</div>

</template>

<script>
import axios from 'axios'
import users from "./users.css"

export default {
  name: 'Users',
   data(){
        return{
        editUser: null,
        newUser:null,
        username:"",
        usermail:"",
        userid:undefined,
        users:[],
        }
    },
 
    created() {
      axios.get('https://my-user-manager.herokuapp.com/users')
      .then(data => this.users = data.data)
      .catch(err => console.log(err))
  },
 
 methods:{

    deleteUser(id, i, userid){
        axios.get("https://my-user-manager.herokuapp.com/users/" + id, userid, {
            method:"DELETE"
        })
        .then(()=>{
            this.users.splice (i, 1); 
            console.log(this.users) 
        })
    },


    updateUser(user){
        axios.get("https://my-user-manager.herokuapp.com/users/" + user.id, {
            body:JSON.stringify(user),
            method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                }
            
        })
        
        .then(()=>{
            this.editUser=null 
        })
    },


    addUser(user, usermail, userid) {
        this.users.push({'name': user},{'email':usermail})
        this.username = "";
        this.usermail= "",
        this.userid=undefined,
        this.newUser = false;
        

      axios.get("https://my-user-manager.herokuapp.com/users/", {
        body: JSON.stringify({'name' : user},{'mail' : usermail}),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    },

   },
}
</script>


