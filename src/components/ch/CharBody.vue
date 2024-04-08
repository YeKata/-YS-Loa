<template>
  <div class="char-main">
    <CharNav />
    <EquipMain v-if="store.mode == '장비'" />
    <SkillMain v-else-if="store.mode == '스킬'" />
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'
import CharNav from './CharNav.vue'
import EquipMain from '../chmain/EquipMain.vue'
import SkillMain from '../chmain/SkillMain.vue'

const store = useCharStore()
</script>

<style scoped></style>
