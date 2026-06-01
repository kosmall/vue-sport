<script setup lang="ts">
  import type { Team } from '@/types/team';

  defineProps<{ team: Team }>();
</script>

<template>
  <div class="mb-6 flex items-center gap-4 rounded-xl bg-white p-6 shadow">
    <img
      v-if="team.strBadge"
      :src="team.strBadge"
      :alt="team.strTeam"
      class="h-20 w-20 object-contain"
    />
    <div>
      <h1 class="text-3xl font-bold text-gray-800">{{ team.strTeam }}</h1>
      <p class="mt-1 text-sm text-gray-500">
        {{ [team.strCity, team.strCountry].filter(Boolean).join(', ') }}
        <span v-if="team.intFormedYear"> Founded {{ team.intFormedYear }}</span>
      </p>
      <p v-if="team.strLeague" class="mt-1 text-sm font-medium text-blue-600">
        {{ team.strLeague }}
      </p>
    </div>
  </div>
</template>
