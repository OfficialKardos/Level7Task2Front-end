<template>
    <v-container>
      <v-btn @click="$router.push('/tasks/create')">Create Task</v-btn>
      <v-data-table :headers="headers" :items="tasks">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="$router.push(`/tasks/${item.id}/edit`)">Edit</v-btn>
          <v-btn @click="deleteTask(item.id)" color="red">Delete</v-btn>
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
          { text: 'Task Name', value: 'task_name' },
          { text: 'Description', value: 'description' },
          { text: 'Schedule Date', value: 'schedule_date' },
          { text: 'Priority', value: 'priority' },
          { text: 'Assigned To', value: 'assigned_to' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        tasks: []
      }
    },
    mounted() {
      axios.get('/api/tasks')
        .then(response => this.tasks = response.data)
        .catch(error => console.error(error));
    },
    methods: {
      deleteTask(id) {
        axios.delete(`/api/tasks/${id}`)
          .then(() => this.tasks = this.tasks.filter(task => task.id !== id))
          .catch(error => console.error(error));
      }
    }
  }
  </script>
  