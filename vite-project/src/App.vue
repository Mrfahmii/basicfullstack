<template>
  <div id="app">
    <h1>Users Data (JSON)</h1>
    <pre>{{ jsonData }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import axios from "axios";

// Definisikan state reaktif untuk menyimpan data pengguna
const users = ref([]);

// Fungsi untuk mengambil data ketika komponen di-mount
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/vite");
    if (response.data.success) {
      users.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Definisikan computed property untuk mengonversi data ke JSON string
const jsonData = computed(() => JSON.stringify(users.value, null, 2));
</script>

<style>
/* Tambahkan gaya CSS Anda di sini */
</style>
