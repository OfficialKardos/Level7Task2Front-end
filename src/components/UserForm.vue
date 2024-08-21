<template>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="user.first_name" label="First Name" required></v-text-field>
        <v-text-field v-model="user.last_name" label="Last Name" required></v-text-field>
        <v-text-field v-model="user.email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="user.phone_number" label="Phone Number"></v-text-field>
        <v-text-field v-model="user.password" label="Password" type="password"></v-text-field>
        <v-btn type="submit">Save</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm() {
        const url = this.$route.params.id ? `/api/users/${this.$route.params.id}` : '/api/users';
        const method = this.$route.params.id ? 'put' : 'post';
  
        axios[method](url, this.user)
          .then(() => this.$router.push('/users'))
          .catch(error => console.error(error));
      }
    },
    mounted() {
      if (this.$route.params.id) {
        axios.get(`/api/users/${this.$route.params.id}`)
          .then(response => this.user = response.data)
          .catch(error => console.error(error));
      }
    }
  }
  </script>
  