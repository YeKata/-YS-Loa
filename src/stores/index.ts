import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ArmoryProfile, Engraving, EngravingEffect, Equipment } from '@/types'

export const useCharStore = defineStore('char', () => {
  const Armory: ArmoryProfile[] = reactive([]) // 캐릭터 프로필
  const Equipment: Array<Equipment> = reactive([]) // 장비하고있는 모든것
  const Effects: Array<EngravingEffect> = reactive([]) // 총 장착 각인
  const Engravings: Array<Engraving> = reactive([]) // 장착 각인
  const EngravingsColor: string[] = reactive([]) // 각인 이름 색상
  const EnPoint: string[] = reactive([]) // 각인 활성 수치
  const EquipEnforce: string[] = reactive([]) // 강화수치
  const EquipSet: string[] = reactive([]) // 세트옵션 이름
  const EquipSetColor: string[] = reactive([]) // 셋옵 컬러 클래스명
  const Transcendence: string[] = reactive([]) //초월
  const TotalTranscendence = ref() // 초월수치 총합
  const HighEnforce: string[] = reactive([]) // 상급재련 수치
  const AccessoriesStat: string[] = reactive([]) // 악세사리 특성
  const BraceletStat: string[] = reactive([]) // 팔찌 스탯
  const Stone: string[] = reactive([]) //어빌리티 스톤

  const addArmory = (data: ArmoryProfile) => {
    Armory.push(data)
  }

  const addEquipment = (data: Equipment[]) => {
    for (const i in data) {
      Equipment.push(data[i])
    }
    setEquipEnforce(data)
    setTranscendence(data)
    setEquipSet(data)
    setHighEnforce(data)
    setAccessoriesStat(data)
    setbraceletStat(data)
    setStone(data)
  }

  const addEngraving = (Effect: EngravingEffect[], Engraving: Engraving[]) => {
    for (const i in Effect) {
      Effects.push(Effect[i])
    }
    for (const i in Engraving) {
      Engravings.push(Engraving[i])
      getEngravingPoint(Engraving[i].Tooltip)
    }
  }

  const getEngravingPoint = (data: string) => {
    const tool = JSON.parse(data)
    const del = tool['Element_001']['value']['leftText'].indexOf('트')
    const text = tool['Element_001']['value']['leftText']?.substring(del + 2, del + 5)
    EnPoint.push(text)
    if (tool['Element_001']['value']['forceMiddleText'] == '') {
      EngravingsColor.push('PE')
    } else {
      EngravingsColor.push('JE')
    }
  }

  const setAccessoriesStat = (data: Equipment[]) => {
    console.log(data)
    for (let i = 6; i < 11; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      const txt = tool['Element_005']['value']['Element_001']
      AccessoriesStat.push(txt)
    }
  }
  const setbraceletStat = (data: Equipment[]) => {
    const tool = JSON.parse(data[12]['Tooltip'])
    const CM = tool['Element_004']['value']['Element_001'].indexOf('치명 +')
    const TH = tool['Element_004']['value']['Element_001'].indexOf('특화 +')
    const SS = tool['Element_004']['value']['Element_001'].indexOf('신속 +')
    const JA = tool['Element_004']['value']['Element_001'].indexOf('제압 +')
    const IN = tool['Element_004']['value']['Element_001'].indexOf('인내 +')
    const SL = tool['Element_004']['value']['Element_001'].indexOf('숙련 +')
    for (let i = 0; i < 6; i++) {
      if (i == 0) {
        if (CM != -1) {
          const value = tool['Element_004']['value']['Element_001'].substring(CM, CM + 7)
          BraceletStat.push(value.replace(/</g, ''))
        }
      } else if (i == 1) {
        if (TH != -1) {
          const value = tool['Element_004']['value']['Element_001'].substring(TH, TH + 7)
          BraceletStat.push(value.replace(/</g, ''))
        }
      } else if (i == 2) {
        if (SS != -1) {
          const value = tool['Element_004']['value']['Element_001'].substring(SS, SS + 7)
          BraceletStat.push(value.replace(/</g, ''))
        }
      } else if (i == 3) {
        if (JA != -1) {
          const value = tool['Element_004']['value']['Element_001'].substring(JA, JA + 7)
          BraceletStat.push(value.replace(/</g, ''))
        }
      } else if (i == 4) {
        if (IN != -1) {
          const value = tool['Element_004']['value']['Element_001'].substring(IN, IN + 7)
          BraceletStat.push(value.replace(/</g, ''))
        }
      } else if (i == 5) {
        if (SL != -1) {
          const value = tool['Element_004']['value']['Element_001'].substring(SL, SL + 7)
          BraceletStat.push(value.replace(/</g, ''))
        }
      }
    }
  }

  const setStone = (data: Equipment[]) => {
    const tool = JSON.parse(data[11]['Tooltip'])
    const st =
      tool['Element_006']['value']['Element_000']['contentStr']['Element_000']['contentStr']
    Stone.push(st.replace(']', '').replace('[', '').replace('활성도', ''))
    const st1 =
      tool['Element_006']['value']['Element_000']['contentStr']['Element_001']['contentStr']
    Stone.push(st1.replace(']', '').replace('[', '').replace('활성도', ''))
    const st2 =
      tool['Element_006']['value']['Element_000']['contentStr']['Element_002']['contentStr']
    Stone.push(st2.replace(']', '').replace('[', '').replace('활성도', ''))
    console.log(Stone)
  }

  const setEquipEnforce = (data: Equipment[]) => {
    for (let i = 0; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      const st = tool['Element_000']['value'].indexOf('+')
      const txt = tool['Element_000']['value']?.substring(st, st + 3)
      EquipEnforce.push(txt)
    }
  }

  const setHighEnforce = (data: Equipment[]) => {
    for (let i = 0; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      if (tool['Element_005']['type'] == 'SingleTextBox') {
        const st = tool['Element_005']['value'].indexOf('#FFD200')
        const txt = tool['Element_005']['value']?.substring(st + 9, st + 11)
        HighEnforce.push(txt.replace(/</g, ''))
      } else {
        HighEnforce.push('0')
      }
    }
  }

  const setTranscendence = (data: Equipment[]) => {
    let a = 0
    for (let i = 0; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      if (i == 0) {
        Transcendence.push('0')
      } else if (
        tool['Element_005']['type'] == 'SingleTextBox' &&
        tool['Element_008']['type'] == 'Progress'
      ) {
        const st2 = tool['Element_009']['value']['Element_000']['topStr'].indexOf('</img>')
        const txt2 = tool['Element_009']['value']['Element_000']['topStr']?.substring(
          st2 + 6,
          st2 + 8
        )
        a += parseInt(txt2)
        Transcendence.push(txt2)
      } else if (
        tool['Element_005']['type'] == 'SingleTextBox' &&
        tool['Element_008']['type'] == 'IndentStringGroup'
      ) {
        const st2 = tool['Element_008']['value']['Element_000']['topStr'].indexOf('</img>')
        const txt2 = tool['Element_008']['value']['Element_000']['topStr']?.substring(
          st2 + 6,
          st2 + 8
        )
        a += parseInt(txt2)
        Transcendence.push(txt2)
      } else if (tool['Element_008']['type'] == 'SingleTextBox') {
        const st2 = tool['Element_008']['value']['Element_000']['topStr'].indexOf('</img>')
        const txt2 = tool['Element_008']['value']['Element_000']['topStr']?.substring(
          st2 + 6,
          st2 + 8
        )
        a += parseInt(txt2)
        Transcendence.push(txt2)
      } else if (tool['Element_007']['type'] == 'Progress') {
        const st2 = tool['Element_008']['value']['Element_000']['topStr'].indexOf('</img>')
        const txt2 = tool['Element_008']['value']['Element_000']['topStr']?.substring(
          st2 + 6,
          st2 + 8
        )
        a += parseInt(txt2)
        Transcendence.push(txt2)
      } else if (tool['Element_007']['type'] == 'IndentStringGroup') {
        const st2 = tool['Element_007']['value']['Element_000']['topStr'].indexOf('</img>')
        const txt2 = tool['Element_007']['value']['Element_000']['topStr']?.substring(
          st2 + 6,
          st2 + 8
        )
        a += parseInt(txt2)
        Transcendence.push(txt2)
      } else {
        Transcendence.push('0')
      }
    }
    TotalTranscendence.value = a
  }

  const setEquipSet = (data: Equipment[]) => {
    for (let i = 0; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      const tl = Object.keys(tool).length
      for (let a = 0; a < tl; a++) {
        if (tool[Object.keys(tool)[a]]['type'] == 'SetItemGroup') {
          const st = tool[Object.keys(tool)[a]]['value']['firstMsg']
          const ts = st.indexOf('#91fe02')
          const txt = st?.substring(ts + 9, ts + 11)
          EquipSet.push(txt)
          if (txt == '악몽') {
            EquipSetColor.push('AM')
          } else if (txt == '환각') {
            EquipSetColor.push('HG')
          } else if (txt == '구원') {
            EquipSetColor.push('GW')
          } else if (txt == '사멸') {
            EquipSetColor.push('SM')
          } else if (txt == '지배') {
            EquipSetColor.push('JB')
          } else if (txt == '갈망') {
            EquipSetColor.push('GM')
          } else if (txt == '배신') {
            EquipSetColor.push('BS')
          } else if (txt == '매혹') {
            EquipSetColor.push('MH')
          } else if (txt == '파괴') {
            EquipSetColor.push('PG')
          }
        }
      }
    }
  }

  const deleteAll = () => {
    deleteArmory()
    deleteEquipmnet()
    deleteEn()
    deleteAccessorie()
    deleteTranscendence()
    deleteStone()
  }

  const deleteArmory = () => {
    Armory.splice(0)
  }
  const deleteEquipmnet = () => {
    Equipment.splice(0)
    EquipSet.splice(0)
    EquipSetColor.splice(0)
  }
  const deleteEn = () => {
    Effects.splice(0)
    Engravings.splice(0)
    EnPoint.splice(0)
  }
  const deleteAccessorie = () => {
    AccessoriesStat.splice(0)
    BraceletStat.splice(0)
  }

  const deleteTranscendence = () => {
    Transcendence.splice(0)
  }
  const deleteStone = () => {
    Stone.splice(0)
  }
  return {
    Armory,
    Equipment,
    addArmory,
    Effects,
    Engravings,
    EngravingsColor,
    Stone,
    EnPoint,
    Transcendence,
    TotalTranscendence,
    EquipEnforce,
    HighEnforce,
    AccessoriesStat,
    BraceletStat,
    EquipSet,
    EquipSetColor,
    deleteAll,
    addEquipment,
    addEngraving
  }
})
