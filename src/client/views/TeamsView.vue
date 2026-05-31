<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { useTeams } from '@/composables/useTeams';

  const route = useRoute();
  const leagueKey = computed(() => route.params.leagueKey as string);
  const leagueName = computed(() => leagueKey.value.replace(/_/g, ' '));
  const { isPending, isError, data, error } = useTeams(leagueKey);
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8"
  >
    <RouterLink
      :to="{ name: 'leagues' }"
      class="mb-4 w-full max-w-md text-sm text-blue-600 hover:underline"
    >
      Back to leagues
    </RouterLink>
    <h1 class="mb-6 text-4xl font-bold text-blue-600">{{ leagueName }}</h1>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <p v-else-if="!data?.length" class="text-gray-500">No teams found</p>
    <ul v-else class="w-full max-w-md space-y-2">
      <li v-for="team in data" :key="team.idTeam">
        <RouterLink
          :to="{ name: 'team', params: { id: team.idTeam } }"
          class="flex items-center gap-3 rounded bg-white px-4 py-2 shadow hover:bg-blue-50"
        >
          <img
            v-if="team.strBadge"
            :src="team.strBadge"
            :alt="team.strTeam"
            class="h-8 w-8 object-contain"
          />
          <span>{{ team.strTeam }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
