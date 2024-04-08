<template>
  <div class="char-right">
    <div class="stat-box">
      <div class="main-stat-box">
        <div class="stat-column" v-for="(i, a) in sn" :key="a">
          <div class="stat-type">{{ store.Stats[i]?.Type }}</div>
          <div class="stat-value">{{ store.Stats[i]?.Value }}</div>
        </div>
      </div>
      <div class="stat-group-box">
        <div class="stat-group" v-for="(i, a) in fn" :key="a">
          <div class="stat-type">{{ store.Stats[i]?.Type }}</div>
          <div class="stat-value">{{ store.Stats[i]?.Value }}</div>
        </div>
      </div>
      <div class="tendencies-box">
        <div class="tendencies-group" v-for="(i, a) in store.Tendencies" :key="a">
          <div class="stat-type">{{ i.Type }}</div>
          <div class="stat-value">{{ i.Point }}</div>
        </div>
      </div>
    </div>
    <div class="engraving-box">
      <div class="right-item-size" v-for="(i, a) in store.Effects" :key="a">
        <div class="engraving-size">
          <div class="item-bg engraving-img" :style="{ backgroundImage: `url(${i.Icon}) ` }"></div>
          <div class="engraving-text">
            <div class="engraving-name engraving-text-box">
              {{ i.Name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'

const store = useCharStore()
const fn = [0, 1, 3, 2, 4, 5]
const sn = [6, 7]
</script>

<style scoped></style>
