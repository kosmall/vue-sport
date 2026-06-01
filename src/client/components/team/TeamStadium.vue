<script setup lang="ts">
  import SectionCard from './SectionCard.vue';

  defineProps<{
    name: string;
    thumb: string | null;
    capacity: string | null;
  }>();
</script>

<template>
  <SectionCard>
    <h2 class="mb-4 text-lg font-semibold text-gray-700">Stadium</h2>
    <div class="flex gap-4">
      <img
        v-if="thumb"
        :src="thumb"
        :alt="name"
        class="h-28 w-44 shrink-0 rounded-lg object-cover"
      />
      <div>
        <p class="font-medium text-gray-800">{{ name }}</p>
        <p v-if="capacity" class="mt-1 text-sm text-gray-500">
          Capacity: {{ Number(capacity).toLocaleString() }}
        </p>
      </div>
    </div>
  </SectionCard>
</template>
