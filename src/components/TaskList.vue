<template>
    <v-container>
      <v-btn @click="$router.push('/tasks/create')" color="secondary">Create Task</v-btn>
      <v-data-table :headers="headers.text" :items="tasks">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="$router.push(`/tasks/${item.id}/edit`)" color="blue">Edit</v-btn>
          <v-btn @click="confirmDeleteTask(item.id)" color="red">Delete</v-btn>
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
          { text: 'Task Name', value: 'task_name' },
          { text: 'Description', value: 'description' },
          { text: 'Schedule Date', value: 'schedule_date' },
          { text: 'Priority', value: 'priority' },
          { text: 'Assigned To', value: 'assigned_to' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        tasks: [],
        users: {}
      };
    },
    mounted() {
      this.fetchUsers();
      this.fetchTasks();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/api/users');
          this.users = response.data.reduce((acc, user) => {
            acc[user.id] = `${user.first_name} ${user.last_name}`;
            return acc;
          }, {});
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async fetchTasks() {
        try {
          const response = await axios.get('/api/tasks');
          this.tasks = response.data.map(task => ({
            id: task.id,
            task_name: task.task_name,
            description: task.description,
            schedule_date: task.schedule_date,
            priority: task.priority,
            assigned_to: this.users[task.assigned_to] || 'Unknown',
            actions: 'actions'
          }));
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      },
      async confirmDeleteTask(id) {
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
          this.deleteTask(id);
        }
      },
      async deleteTask(id) {
        try {
          await axios.delete(`/api/tasks/${id}`);
          this.tasks = this.tasks.filter(task => task.id !== id);
          Swal.fire(
            'Deleted!',
            'The task has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the task.',
            'error'
          );
        }
      }
    }
  }
  </script>
  