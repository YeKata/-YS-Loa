<template>
  <div class="modal-wrap">
    <div class="modal-box">
      <div :class="store.GemsClass[idx] + '-text'" class="gem-name">
        {{ store.Gems[idx].Name.replace(/<[^>]*>?/g, '') }}
      </div>
      <div class="gem-skill">
        <div class="gem-skillname Legend-text">{{ store.GemsEffects[idx].Name }}</div>
        <div class="gem-description">{{ store.GemsEffects[idx].Description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'
const props = defineProps({
  idx: { type: Number, required: true }
})
const store = useCharStore()
</script>

<style scoped></style>
