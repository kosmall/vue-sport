<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useLeagues } from '@/composables/useLeagues';

  const { isPending, isError, data: leagues, error } = useLeagues();
  const search = ref('');

  const filtered = computed(() =>
    (leagues.value ?? []).filter((l) =>
      l.strLeague.toLowerCase().includes(search.value.toLowerCase()),
    ),
  );

  function toLeagueKey(strLeague: string): string {
    return strLeague.replace(/ /g, '_');
  }
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-gray-100 p-8">
    <h1 class="mb-6 text-4xl font-bold text-blue-600">Sports Browser</h1>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <template v-else>
      <input
        v-model="search"
        type="text"
        placeholder="Search leagues..."
        class="mb-4 w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p v-if="filtered.length === 0" class="text-gray-500">
        No leagues match your search
      </p>
      <ul v-else class="w-full max-w-md space-y-2">
        <li v-for="league in filtered" :key="league.idLeague">
          <RouterLink
            :to="{
              name: 'teams',
              params: { leagueKey: toLeagueKey(league.strLeague) },
            }"
            class="flex items-center gap-3 rounded bg-white px-4 py-2 shadow hover:bg-blue-50"
          >
            <div>
              <p class="font-medium text-gray-800">{{ league.strLeague }}</p>
              <p class="text-sm text-gray-500">{{ league.strSport }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </template>
  </div>
</template>
