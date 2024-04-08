<template>
  <div class="equip-wrap">
    <div class="item-size equip-item-size" v-for="i in items" :key="i">
      <div class="item-bg" :class="store.EquipClass[i]">
        <div class="item-img" :style="{ backgroundImage: `url(${store.Equipment[i].Icon}) ` }">
          <div class="item-tag all-text-size">{{ store.Equipment[i].Type }}</div>
          <div class="item-QV">
            <div class="QV-progress">
              <span class="QV-text">{{ store.EquipmentQV[i] }}</span>
            </div>
            <div
              class="QV-percent"
              :style="{ width: store.EquipmentQV[i] + '%' }"
              :class="store.EquipmentQVClass[i]"
            />
          </div>
        </div>
      </div>
      <div class="item-pakage all-text-size">
        <div class="item-grade">
          <span :class="store.EquipClass[i] + '-text'">{{ store.EquipEnforce[i] }}</span>
          <span class="HE" v-if="store.HighEnforce[i] != '0'"> +{{ store.HighEnforce[i] }} </span>
        </div>
        <div class="item-set">
          <span :class="store.EquipSetColor[i]">{{ store.EquipSet[i] }}</span>
        </div>
        <div class="total-tsc" v-if="store.TotalTranscendence != '0'">
          <div class="item-tsc-img" />
          <div class="TSC">
            {{ store.Transcendence[i] }}
          </div>
          <!-- <div v-else class="TSC">{{ store.TotalTranscendence }}</div> -->
        </div>
      </div>
      <div class="item-pakage all-text-size">
        <div class="Elixir" v-for="(a, b) in store.Elixir[i]" :key="b">
          <div v-if="i != 0">{{ a }}</div>
          <div v-else :class="store.ElixirClass">{{ a }}</div>
        </div>
        <div class="TSC total-tsc" v-if="i == 0">
          <div class="item-tsc-img" />
          {{ store.TotalTranscendence }}
        </div>
      </div>
    </div>

    <div class="item-size">
      <div class="engraving-size" v-for="(item, i) in store.Engravings" :key="i">
        <div class="item-bg engraving-img" :style="{ backgroundImage: `url(${item.Icon}) ` }"></div>
        <div class="engraving-text all-text-size">
          <div class="engraving-name engraving-text-box" :class="store.EngravingsColor[i]">
            {{ item.Name }}
          </div>
          <div class="engraving-point engraving-text-box">활성도 {{ store.EnPoint[i] }}</div>
        </div>
      </div>
    </div>

    <div class="item-size accessories-item-size" v-for="(i, a) in store.Accessories" :key="a">
      <div class="item-bg" :class="store.AccessoriesClass[a]">
        <div class="item-img" :style="{ backgroundImage: `url(${i.Icon}) ` }">
          <div class="item-tag all-text-size">{{ i.Type }}</div>
          <div class="item-QV">
            <div class="QV-progress">
              <span class="QV-text">{{ store.AccessoriesQV[a] }}</span>
            </div>
            <div
              class="QV-percent"
              :style="{ width: store.AccessoriesQV[a] + '%' }"
              :class="store.AccessoriesQVClass[a]"
            />
          </div>
        </div>
      </div>
      <div class="item-pakage all-text-size">
        <div :class="store.AccessoriesClass[a] + '-text'">
          {{ i.Grade }}
        </div>
        <div v-html="store.AccessoriesStat[a]"></div>
      </div>
      <div class="item-pakage all-text-size">
        <div v-for="(j, b) in store.AccessoriesEngraving[a]" :key="b">
          <div class="ac-engraving">{{ j }}</div>
        </div>
      </div>
    </div>

    <div class="item-size bracelet-item-size" v-for="(i, a) in store.Bracelet" :key="a">
      <div class="item-bg" :class="store.BraceletClass">
        <div class="item-img" :style="{ backgroundImage: `url(${i.Icon}) ` }">
          <div class="item-tag all-text-size">{{ i.Type }}</div>
        </div>
      </div>
      <div class="item-pakage all-text-size">
        <div :class="store.BraceletClass + '-text'">
          {{ i.Grade }}
        </div>
        <div v-for="(i, a) in store.BraceletStat" :key="a">
          {{ i }}
        </div>
        <div></div>
      </div>
    </div>

    <div class="item-size stone-item-size">
      <div class="item-bg" :class="store.StoneClass">
        <div
          class="item-img"
          v-if="store.StoneNum != undefined"
          :style="{ backgroundImage: `url(${store.Equipments[store.StoneNum].Icon}) ` }"
        >
          <div class="item-tag all-text-size">
            {{ store.Equipments[store.StoneNum].Type.substring(4) }}
          </div>
        </div>
        <div class="item-img" v-else>
          <div class="item-tag all-text-size">x</div>
        </div>
      </div>
      <div class="item-pakage all-text-size">
        <div class="stone-tag" v-for="(i, a) in store.Stone" :key="a" v-html="i"></div>
      </div>
    </div>
  </div>
  <div class="gem-wrap">
    <div class="gem-box" :class="store.GemsClass[a]" v-for="(i, a) in store.Gems" :key="a">
      <GemsModal :class="[store.GemsModal[a] ? 'gem-modal-on' : 'gem-modal-off']" :idx="a" />
      <div
        class="gem-img"
        :style="{ backgroundImage: `url(${i.Icon}) ` }"
        @mouseover="store.OverModal(a)"
        @mouseleave="store.LeaveModal(a)"
      >
        <div class="gem-lv">{{ i.Level }}</div>
      </div>
    </div>
  </div>
  <div class="card-wrap">
    <div class="card-container">
      <div class="card-box" v-for="(i, a) in store.Cards" :key="a">
        <div class="card-img" :style="{ backgroundImage: `url(${i.Icon})` }">
          <div class="card-awake-box">
            <div v-for="(i, b) in store.CardAwake[a]" :key="b" :class="i" />
          </div>
        </div>
      </div>
    </div>
    <div class="card-effect">
      <div class="card-effect-box" v-for="(i, a) in store.CardEffects" :key="a">
        <div class="card-effect-name">{{ i.Name }}</div>
        <div class="card-effect-description">
          <ul class="card-effect-description">
            <li>{{ i.Description }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'
import GemsModal from '../ch/GemsModal.vue'

const store = useCharStore()
const items = [1, 5, 2, 3, 4, 0]
</script>

<style scoped></style>
