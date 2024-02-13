<template>
  <div class="char-left">
    <div class="profile-wrap">
      <div class="profile-text">
        <div class="profile-box">
          <div class="profile-list profile-mg">서버</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].ServerName }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">닉네임</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].CharacterName }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">길드</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].GuildName }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">역할</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].GuildMemberGrade }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">클래스</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].CharacterClassName }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">칭호</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].Title }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">전투</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].CharacterLevel }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">아이템</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].ItemAvgLevel }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">원정대</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].ExpeditionLevel }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">PVP</div>
          <div class="profile-value profile-mg">{{ store.Armory[0].PvpGradeName }}</div>
        </div>
        <div class="profile-box">
          <div class="profile-list profile-mg">영지</div>
          <div class="profile-value profile-mg">
            LV.{{ store.Armory[0].TownLevel }}
            {{ store.Armory[0].TownName }}
          </div>
        </div>
      </div>
      <div
        class="char-img"
        :style="{ backgroundImage: `url(${store.Armory[0].CharacterImage}) ` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'

const store = useCharStore()
</script>

<style scoped></style>
