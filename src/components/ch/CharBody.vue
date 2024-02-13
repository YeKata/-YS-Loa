<template>
  <div class="char-main">
    <CharNav />
    <div class="equip-wrap">
      <div class="item-size" v-for="i in items" :key="i">
        <div class="item-bg item-bgc">
          <div class="item-img" :style="{ backgroundImage: `url(${store.Equipment[i].Icon}) ` }">
            <div class="item-tag">{{ store.Equipment[i].Type }}</div>
          </div>
        </div>
        <div class="item-pakage">
          <div class="item-grade">
            <span class="go-dae">{{ store.EquipEnforce[i] }}</span>
            <span class="HE" v-if="store.HighEnforce[i] != '0'"> +{{ store.HighEnforce[i] }} </span>
          </div>
          <div class="item-set">
            <span :class="store.EquipSetColor[i]">{{ store.EquipSet[i] }}</span>
          </div>
          <div class="total-tsc" v-if="store.TotalTranscendence != '0'">
            <div class="item-tsc-img" />
            <div class="TSC" v-if="store.Transcendence[i] != '0'">
              {{ store.Transcendence[i] }}
            </div>
            <div v-else class="TSC">{{ store.TotalTranscendence }}</div>
          </div>
        </div>
      </div>
      <div class="item-size">
        <div class="engraving-size" v-for="(item, i) in store.Engravings" :key="i">
          <div
            class="item-bg engraving-img"
            :style="{ backgroundImage: `url(${item.Icon}) ` }"
          ></div>
          <div class="engraving-text">
            <div class="engraving-name engraving-text-box" :class="store.EngravingsColor[i]">
              {{ item.Name }}
            </div>
            <div class="engraving-point engraving-text-box">활성도 {{ store.EnPoint[i] }}</div>
          </div>
        </div>
      </div>
      <div class="item-size" v-for="(i, a) in accessories" :key="i">
        <div class="item-bg item-bgc">
          <div class="item-img" :style="{ backgroundImage: `url(${store.Equipment[i].Icon}) ` }">
            <div class="item-tag">{{ store.Equipment[i].Type }}</div>
          </div>
        </div>
        <div class="item-pakage">
          <div class="go-dae">
            {{ store.Equipment[i].Grade }}
          </div>
          <div v-if="i != 12" v-html="store.AccessoriesStat[a]"></div>
          <div v-else v-for="(i, a) in store.BraceletStat" :key="a">
            {{ i }}
          </div>
          <div></div>
        </div>
      </div>
      <div class="item-size">
        <div class="item-bg item-bgc">
          <div
            class="item-img"
            :style="{ backgroundImage: `url(${store.Equipment[stone].Icon}) ` }"
          >
            <div class="item-tag">{{ store.Equipment[stone].Type.substring(4) }}</div>
          </div>
        </div>
        <div class="item-pakage">
          <div class="stone-tag" v-for="(i, a) in store.Stone" :key="a" v-html="i"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'
import CharNav from './CharNav.vue'

const store = useCharStore()
const items = [1, 5, 2, 3, 4, 0]
const accessories = [6, 7, 8, 9, 10, 12]
const stone = 11
</script>

<style scoped></style>
