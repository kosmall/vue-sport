<script setup lang="ts">
  import SectionCard from './SectionCard.vue';

  defineProps<{ description: string }>();
</script>

<template>
  <SectionCard>
    <h2 class="mb-2 text-lg font-semibold text-gray-700">About</h2>
    <p class="text-sm leading-relaxed text-gray-600">{{ description }}</p>
  </SectionCard>
</template>
