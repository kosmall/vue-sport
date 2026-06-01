<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useLeagues } from '@/composables/useLeagues';
  import PageLayout from '@/components/PageLayout.vue';
  import ListItem from '@/components/ListItem.vue';
  import { toLeagueKey } from '@/utils/leagueKey';

  const { isPending, isError, data: leagues, error } = useLeagues();
  const search = ref('');

  const filtered = computed(() =>
    (leagues.value ?? []).filter((l) =>
      l.strLeague.toLowerCase().includes(search.value.toLowerCase()),
    ),
  );
</script>

<template>
  <PageLayout>
    <h1 class="mb-6 text-4xl font-bold text-blue-600">Sports Browser</h1>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <template v-else>
      <input
        v-model="search"
        type="text"
        placeholder="Search leagues..."
        class="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p v-if="filtered.length === 0" class="text-gray-500">
        No leagues match your search
      </p>
      <ul v-else class="w-full space-y-2">
        <ListItem
          v-for="league in filtered"
          :key="league.idLeague"
          :to="{
            name: 'teams',
            params: { leagueKey: toLeagueKey(league.strLeague) },
          }"
        >
          <div>
            <p class="font-medium text-gray-800">{{ league.strLeague }}</p>
            <p class="text-sm text-gray-500">{{ league.strSport }}</p>
          </div>
        </ListItem>
      </ul>
    </template>
  </PageLayout>
</template>
