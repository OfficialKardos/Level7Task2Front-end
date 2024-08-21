<!-- src/App.vue -->
<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Task and User Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/users')">Users</v-btn>
      <v-btn @click="$router.push('/tasks')">Tasks</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <v-col class="text-center">
        © 2024 Your Company
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
