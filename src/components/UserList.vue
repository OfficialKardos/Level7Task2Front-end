<template>
    <v-container>
      <v-btn @click="$router.push('/users/create')">Create User</v-btn>
      <v-data-table :headers="headers" :items="users">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="$router.push(`/users/${item.id}/edit`)">Edit</v-btn>
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
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        users: []
      }
    },
    mounted() {
      axios.get('/api/users')
        .then(response => this.users = response.data)
        .catch(error => console.error(error));
    },
    methods: {
      deleteUser(id) {
        axios.delete(`/api/users/${id}`)
          .then(() => this.users = this.users.filter(user => user.id !== id))
          .catch(error => console.error(error));
      }
    }
  }
  </script>
  