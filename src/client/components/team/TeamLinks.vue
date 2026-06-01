<script setup lang="ts">
  import SectionCard from './SectionCard.vue';

  defineProps<{ links: { label: string; href: string }[] }>();
</script>

<template>
  <SectionCard>
    <h2 class="mb-3 text-lg font-semibold text-gray-700">Links</h2>
    <div class="flex flex-wrap gap-2">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
      >
        {{ link.label }}
      </a>
    </div>
  </SectionCard>
</template>
