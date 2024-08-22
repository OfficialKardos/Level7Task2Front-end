<template>
    <v-container>
      <v-btn @click="$router.push('/users/create')" color="primary">Create User</v-btn>
      <v-data-table :headers="headers.text" :items="users">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="$router.push(`/users/${item.id}/edit`)" color="blue">Edit</v-btn>
          <v-btn @click="confirmDelete(item.id)" color="red">Delete</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
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
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/api/users');
          this.users = response.data.map(user => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            actions: 'actions'
          }));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async confirmDelete(id) {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "This action cannot be undone!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });
  
        if (result.isConfirmed) {
          this.deleteUser(id);
        }
      },
      async deleteUser(id) {
        try {
          await axios.delete(`/api/users/${id}`);
          this.users = this.users.filter(user => user.id !== id);
          Swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the user.',
            'error'
          );
        }
      }
    }
  }
  </script>
  