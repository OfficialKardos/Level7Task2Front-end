<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Task Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/users" text>Users</v-btn>
      <v-btn to="/tasks" text>Tasks</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <v-col class="text-center">&copy; 2024 Task Management System</v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* You can add global styles here */
</style>
