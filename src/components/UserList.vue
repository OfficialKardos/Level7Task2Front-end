<!-- src/components/UserList.vue -->
<template>
    <v-container>
      <v-btn @click="$router.push('/users/create')" color="primary">Create User</v-btn>
      <v-data-table :headers="headers" :items="users" item-key="id">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="$router.push(`/users/${item.id}/edit`)" color="blue">Edit</v-btn>
          <v-btn @click="deleteUser(item.id)" color="red">Delete</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        headers: [
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone Number', value: 'phone_number' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        users: []
      };
    },
    mounted() {
      axios.get('/api/users')
        .then(response => {
          this.users = response.data;
          console.log(this.users); // Check the structure of the data
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    methods: {
      deleteUser(id) {
        axios.delete(`/api/users/${id}`)
          .then(() => {
            this.users = this.users.filter(user => user.id !== id);
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      }
    }
  };
  </script>
  
  