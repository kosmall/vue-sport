<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import type { RouteLocationRaw } from 'vue-router';

  defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="flex items-center gap-3 rounded bg-white px-4 py-2 shadow hover:bg-blue-50"
    >
      <slot />
    </RouterLink>
  </li>
</template>
