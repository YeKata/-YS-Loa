<template>
  <div class="header-box">
    <div class="header-first">
      <div class="header-title text-btn" @click="toHome()">LOA.YS</div>
      <div class="sizing">
        <input
          type="text"
          :value="name"
          id="name"
          class="input-box"
          placeholder="닉네임을 입력하세요"
          @input="inputcomment"
          @keyup.enter="toDetail"
        />
        <div class="search header-icon svg-box text-btn" @click="toDetail" />
      </div>
    </div>
    <div class="header-nav">
      <div class="text-btn nav-btn">홈</div>
      <div class="text-btn nav-btn">자격검증</div>
      <div class="text-btn nav-btn">길드</div>
      <div class="text-btn nav-btn">순위</div>
      <div class="text-btn nav-btn">건의사항</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharStore } from '@/stores'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const name = ref()
const router = useRouter()
const store = useCharStore()

const toHome = () => {
  router.push('/')
}

const toDetail = async () => {
  try {
    const { data } = await axios(
      `https://developer-lostark.game.onstove.com/armories/characters/${name.value}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization:
            'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDA0NTkwMDMifQ.nukDiTlC_fGELch9tN1KM3aAivSO6VcTo0CexLHZb7iHzdnmQvuNTyDFMvrngcGuVe_4kxsiBQKQDV9_u33Whwdka3VmqqUSMl21j946iE3MLHd5T6nPFOPHQL1tdeDhzpu2Wa_edjFKVioKL7F_MH7rUG1nbAP8m8aAlqKuo8t2BK-qGJwF4_U3WVg-606Qt3nlybXlyJivaGSznzmE_EiV5dka6aH92YeCubAKjgp14x-Nnv30WvNzfgu9gzZUSjy48MmnXE3dgaEeHjtn9ps85tWC8NBkWZ7IN5_Lc5hEYS3P0QSGGmlFaAPSxhAIOr0JZcCLXAu6B5MogViLDg'
        }
      }
    )
    if (data) {
      if (store.Armory) {
        store.deleteAll()
      }
      store.addArmory(data.ArmoryProfile)
      store.addEquipment(data.ArmoryEquipment)
      store.addEngraving(data.ArmoryEngraving['Effects'], data.ArmoryEngraving['Engravings'])
      router.push({
        name: 'char',
        params: { name: name.value }
      })
    } else {
      console.log('없음')
    }
  } catch (error) {
    console.log(error)
  }
}

const inputcomment = (e: Event) => {
  if ((e.target as HTMLInputElement).id == 'name') {
    name.value = (e.target as HTMLInputElement).value
  }
}
</script>

<style scoped></style>
