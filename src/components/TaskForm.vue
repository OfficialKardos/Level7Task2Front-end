<template>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="task.task_name" label="Task Name" required></v-text-field>
        <v-textarea v-model="task.description" label="Description" required></v-textarea>
        <v-menu v-model="menu" :close-on-content-click="false">
          <template #activator="{ on, attrs }">
            <v-text-field v-model="task.schedule_date" label="Schedule Date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="task.schedule_date" @input="menu = false"></v-date-picker>
        </v-menu>
        <v-select v-model="task.priority" :items="priorities" label="Priority" required></v-select>
        <v-select v-model="task.assigned_to" :items="users" item-value="id" item-text="name" label="Assigned To" required></v-select>
        <v-btn type="submit">Save</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        task: {
          task_name: '',
          description: '',
          schedule_date: '',
          priority: '',
          assigned_to: ''
        },
        priorities: ['Low', 'Medium', 'High'],
        users: [],
        menu: false
      }
    },
    mounted() {
      if (this.$route.params.id) {
        axios.get(`/api/tasks/${this.$route.params.id}`)
          .then(response => this.task = response.data)
          .catch(error => console.error(error));
      }
  
      axios.get('/api/users')
        .then(response => this.users = response.data.map(user => ({ id: user.id, name: `${user.first_name} ${user.last_name}` })))
        .catch(error => console.error(error));
    },
    methods: {
      submitForm() {
        const url = this.$route.params.id ? `/api/tasks/${this.$route.params.id}` : '/api/tasks';
        const method = this.$route.params.id ? 'put' : 'post';
  
        axios[method](url, this.task)
          .then(() => this.$router.push('/tasks'))
          .catch(error => console.error(error));
      }
    }
  }
  </script>
  