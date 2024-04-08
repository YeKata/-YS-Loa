<template>
  <div class="skill-wrap">
    <div
      class="skills-size"
      v-for="(i, a) in store.Skills"
      :key="a"
      :class="{ awaken: i.IsAwakening }"
    >
      <div class="skill-img-box">
        <div class="skill-img" :style="{ backgroundImage: `url(${i.Icon}) ` }" />
        <div class="skill-lelvel" v-if="i.IsAwakening == false">{{ i.Level }}</div>
      </div>
      <div class="skill-first-box" v-if="i.IsAwakening == false">
        <div class="skill-rune-grade" :class="store.SkillRuneClass[a]">
          <div class="skill-rune-img" :style="{ backgroundImage: `url(${i.Rune.Icon}) ` }" />
          <div class="skill-rune-name">{{ i.Rune.Name }}</div>
        </div>
      </div>
      <div class="skill-gem-box"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'

const store = useCharStore()
</script>

<style scoped>
.skill-wrap {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  border: rgb(42, 57, 99) 1px solid;
  border-radius: 0.5rem;
  margin: 0.5rem;
  gap: 0.5rem;
}

.skills-size {
  display: grid;
  grid-template-columns: 0.8fr 0.8fr 1.9fr 2.5fr;
  border: 1px solid rgb(42, 57, 99);
  gap: 0.5rem;
}
.awaken {
  grid-template-columns: 0.8fr 5.2fr;
}

.skill-img-box {
  position: relative;
}

.skill-img-box {
  border: 1px solid white;
  width: 100%;
}

.skill-img-box::after {
  display: block;
  content: '';
  padding-bottom: 100%;
}

.skill-img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
}

.skill-lelvel {
  position: absolute;
  border: 1px solid white;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  width: 25px;
  height: 25px;
  bottom: 1px;
  right: 1px;
}

.skill-rune-grade {
  width: 100%;
  border: 1px solid white;
  position: relative;
}

.skill-rune-grade::after {
  display: block;
  content: '';
  padding-bottom: 100%;
}
.skill-rune-img {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: absolute;
}

.skill-rune-name {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1px;
  right: 1px;
}

.skill-first-text-box {
  display: grid;
  grid-template-rows: 1fr 2fr;
}
.skill-first-line {
  display: flex;
  gap: 0.3rem;
}
</style>
