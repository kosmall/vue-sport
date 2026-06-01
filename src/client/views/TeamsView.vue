<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { useTeams } from '@/composables/useTeams';
  import PageLayout from '@/components/PageLayout.vue';
  import ListItem from '@/components/ListItem.vue';
  import { fromLeagueKey } from '@/utils/leagueKey';

  const route = useRoute();
  const leagueKey = computed(() => route.params.leagueKey as string);
  const leagueName = computed(() => fromLeagueKey(leagueKey.value));
  const { isPending, isError, data, error } = useTeams(leagueKey);
</script>

<template>
  <PageLayout>
    <RouterLink
      :to="{ name: 'leagues' }"
      class="mb-4 inline-block text-sm text-blue-600 hover:underline"
    >
      Back to leagues
    </RouterLink>
    <h1 class="mb-6 text-4xl font-bold text-blue-600">{{ leagueName }}</h1>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <p v-else-if="!data?.length" class="text-gray-500">No teams found</p>
    <ul v-else class="w-full space-y-2">
      <ListItem
        v-for="team in data"
        :key="team.idTeam"
        :to="{ name: 'team', params: { id: team.idTeam } }"
      >
        <img
          v-if="team.strBadge"
          :src="team.strBadge"
          :alt="team.strTeam"
          class="h-8 w-8 object-contain"
        />
        <span>{{ team.strTeam }}</span>
      </ListItem>
    </ul>
  </PageLayout>
</template>
