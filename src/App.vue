<template>
  <div class="container mx-auto p-4">
    <nav class="mb-4">
      <router-link to="/" class="mr-4 text-blue-500 hover:text-blue-700">Data Entry</router-link>
      <router-link to="/display" class="text-blue-500 hover:text-blue-700">Data Display</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>