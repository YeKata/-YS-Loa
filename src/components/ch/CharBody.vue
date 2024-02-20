<template>
  <div class="char-main">
    <CharNav />
    <div class="equip-wrap">
      <div class="item-size" v-for="i in items" :key="i">
        <div class="item-bg" :class="store.EquipClass[i]">
          <div class="item-img" :style="{ backgroundImage: `url(${store.Equipment[i].Icon}) ` }">
            <div class="item-tag">{{ store.Equipment[i].Type }}</div>
          </div>
        </div>
        <div class="item-pakage">
          <div class="item-grade">
            <span :class="store.EquipClass[i] + '-text'">{{ store.EquipEnforce[i] }}</span>
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

      <div class="item-size" v-for="(i, a) in store.Accessories" :key="a">
        <div class="item-bg" :class="store.AccessoriesClass[a]">
          <div class="item-img" :style="{ backgroundImage: `url(${i.Icon}) ` }">
            <div class="item-tag">{{ i.Type }}</div>
          </div>
        </div>
        <div class="item-pakage">
          <div :class="store.AccessoriesClass[a] + '-text'">
            {{ i.Grade }}
          </div>
          <div v-html="store.AccessoriesStat[a]"></div>
        </div>
        <div></div>
      </div>

      <div class="item-size" v-for="(i, a) in store.Bracelet" :key="a">
        <div class="item-bg" :class="store.BraceletClass">
          <div class="item-img" :style="{ backgroundImage: `url(${i.Icon}) ` }">
            <div class="item-tag">{{ i.Type }}</div>
          </div>
        </div>
        <div class="item-pakage">
          <div :class="store.BraceletClass + '-text'">
            {{ i.Grade }}
          </div>
          <div v-for="(i, a) in store.BraceletStat" :key="a">
            {{ i }}
          </div>
          <div></div>
        </div>
      </div>

      <div class="item-size">
        <div class="item-bg" :class="store.StoneClass">
          <div
            class="item-img"
            v-if="store.StoneNum != undefined"
            :style="{ backgroundImage: `url(${store.Equipments[store.StoneNum].Icon}) ` }"
          >
            <div class="item-tag">{{ store.Equipments[store.StoneNum].Type.substring(4) }}</div>
          </div>
          <div class="item-img" v-else>
            <div class="item-tag">x</div>
          </div>
        </div>
        <div class="item-pakage">
          <div class="stone-tag" v-for="(i, a) in store.Stone" :key="a" v-html="i"></div>
        </div>
      </div>
    </div>

    <div class="gem-wrap">
      <div class="gem-box" :class="store.GemsClass[a]" v-for="(i, a) in store.Gems" :key="a">
        <div class="gem-img" :style="{ backgroundImage: `url(${i.Icon}) ` }">
          <div class="gem-lv">{{ i.Level }}</div>
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
</script>

<style scoped></style>
