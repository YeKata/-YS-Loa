<template>
  <div class="equip-nav">
    <div class="eq-nav-btn" v-for="i in nav" :key="i" @click="ChangeMode(i)">
      <div>{{ i }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'

const nav = ['장비', '스킬', '길드', '캐릭터']
const store = useCharStore()
const ChangeMode = (i: string) => {
  store.mode = i
}
</script>

<style scoped></style>
