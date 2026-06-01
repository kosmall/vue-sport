<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTeam } from '@/composables/useTeam';
  import PageLayout from '@/components/PageLayout.vue';
  import TeamHeader from '@/components/team/TeamHeader.vue';
  import TeamAbout from '@/components/team/TeamAbout.vue';
  import TeamStadium from '@/components/team/TeamStadium.vue';
  import TeamLinks from '@/components/team/TeamLinks.vue';

  const route = useRoute();
  const router = useRouter();
  const id = computed(() => route.params.id as string);
  const { isPending, isError, data: team, error } = useTeam(id);

  const socialLinks = computed(() => {
    if (!team.value) return [];
    return [
      {
        label: 'Website',
        href: team.value.strWebsite ? `https://${team.value.strWebsite}` : null,
      },
      {
        label: 'Twitter',
        href: team.value.strTwitter ? `https://${team.value.strTwitter}` : null,
      },
      {
        label: 'Facebook',
        href: team.value.strFacebook
          ? `https://${team.value.strFacebook}`
          : null,
      },
      {
        label: 'Instagram',
        href: team.value.strInstagram
          ? `https://${team.value.strInstagram}`
          : null,
      },
      {
        label: 'YouTube',
        href: team.value.strYoutube ? `https://${team.value.strYoutube}` : null,
      },
    ].filter((link) => link.href !== null) as { label: string; href: string }[];
  });
</script>

<template>
  <PageLayout>
    <button
      class="mb-6 inline-block cursor-pointer text-sm text-blue-600 hover:underline"
      type="button"
      @click="router.go(-1)"
    >
      Back to teams
    </button>

    <div v-if="isPending" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="isError" class="text-center text-red-500">
      Error: {{ error?.message }}
    </div>

    <template v-else-if="team">
      <TeamHeader :team="team" />
      <TeamAbout
        v-if="team.strDescriptionEN"
        :description="team.strDescriptionEN"
      />
      <TeamStadium
        v-if="team.strStadium"
        :name="team.strStadium"
        :thumb="team.strStadiumThumb"
        :capacity="team.intStadiumCapacity"
      />
      <TeamLinks v-if="socialLinks.length" :links="socialLinks" />
    </template>
  </PageLayout>
</template>
