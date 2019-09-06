<template >
<div>
    <h1>My Users</h1>
<div class="wrapper-div">
        <div v-for="user in users" v-bind:key="user.id" class="user-div"> 
            <div v-if="editUser===user.id">
                <input v-model="user.name" /> 
                <input v-model="user.email"/>
                <button v-on:click="updateUser(user.id, user)">Save</button>
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
                <input v-model="email" placeholder="Email of new User"/>
                <input v-model.number="id" placeholder="Id number"/>
                
                <div> 
                    <button v-on:click="addUser(username, email, id)">Save</button>
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
        email:"",
        id:"",
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

    deleteUser(id, i){
        
        // console.log(this.users) 
        // axios.delete(this.users + id, {
        //     method:"DELETE"
        // })
        // .then(()=>{
            this.users.splice (-1+i, 1); 
            console.log(i) 
        // })
    },


    updateUser(userid, user){
        
       this.username= user.name
       this.email= user.email 
        
            this.editUser=null 
    
    },



addUser() {
        this.users.push({
            name: this.username,
            email: this.email,
            id:this.id,
                })
        this.newUser = false;
        console.log(this.users)

    },

 

   },
}

//  axios.get("https://my-user-manager.herokuapp.com/users" + user.id, {
//             body:JSON.stringify(user),
//             method:"PUT",
//                 headers:{
//                     "Content-Type": "application/json",
//                 }
//         })

//  deleteUser(id, i, userid){
//         axios.get("https://my-user-manager.herokuapp.com/users/" + id, userid, {
//             method:"DELETE"
//         })
//         .then(()=>{
//             this.users.splice (i, 1); 
//             console.log(this.users) 
//         })
//     },
</script>
