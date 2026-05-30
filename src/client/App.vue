<script setup lang="ts">
  import { useTeams } from '@/composables/useTeams';

  const { isPending, isError, data, error } = useTeams();
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8"
  >
    <h1 class="mb-6 text-4xl font-bold text-blue-600">Premier League Teams</h1>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <pre
      v-else
      class="w-full max-w-4xl overflow-auto rounded bg-white p-4 text-sm shadow"
      >{{ JSON.stringify(data, null, 2) }}</pre
    >
  </div>
</template>
