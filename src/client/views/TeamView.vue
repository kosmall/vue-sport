<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTeam } from '@/composables/useTeam';

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
  <div class="min-h-screen bg-gray-100">
    <div class="mx-auto max-w-3xl px-4 py-8">
      <button
        class="mb-6 inline-block text-sm text-blue-600 hover:underline cursor-pointer"
        @click="router.go(-1)"
      >
        Back to teams
      </button>

      <div v-if="isPending" class="text-center text-gray-500">Loading...</div>
      <div v-else-if="isError" class="text-center text-red-500">
        Error: {{ error?.message }}
      </div>

      <template v-else-if="team">
        <div
          class="mb-6 flex items-center gap-4 rounded-xl bg-white p-6 shadow"
        >
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
              <span v-if="team.intFormedYear">
                Founded {{ team.intFormedYear }}
              </span>
            </p>
            <p
              v-if="team.strLeague"
              class="mt-1 text-sm font-medium text-blue-600"
            >
              {{ team.strLeague }}
            </p>
          </div>
        </div>

        <div
          v-if="team.strDescriptionEN"
          class="mb-6 rounded-xl bg-white p-6 shadow"
        >
          <h2 class="mb-2 text-lg font-semibold text-gray-700">About</h2>
          <p class="text-sm leading-relaxed text-gray-600">
            {{ team.strDescriptionEN }}
          </p>
        </div>

        <div v-if="team.strStadium" class="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 class="mb-4 text-lg font-semibold text-gray-700">Stadium</h2>
          <div class="flex gap-4">
            <img
              v-if="team.strStadiumThumb"
              :src="team.strStadiumThumb"
              :alt="team.strStadium"
              class="h-28 w-44 shrink-0 rounded-lg object-cover"
            />
            <div>
              <p class="font-medium text-gray-800">{{ team.strStadium }}</p>
              <p
                v-if="team.intStadiumCapacity"
                class="mt-1 text-sm text-gray-500"
              >
                Capacity: {{ Number(team.intStadiumCapacity).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="socialLinks.length" class="rounded-xl bg-white p-6 shadow">
          <h2 class="mb-3 text-lg font-semibold text-gray-700">Links</h2>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
