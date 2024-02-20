import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  ArmoryGem,
  ArmoryProfile,
  Engraving,
  EngravingEffect,
  Equipment,
  Gem,
  GemEffect
} from '@/types'

export const useCharStore = defineStore('char', () => {
  const Armory: ArmoryProfile[] = reactive([]) // 캐릭터 프로필
  const Equipments: Array<Equipment> = reactive([]) // 장비하고있는 모든것
  const Equipment: Array<Equipment> = reactive([]) // 방어구 및 무기
  const Effects: Array<EngravingEffect> = reactive([]) // 총 장착 각인
  const Engravings: Array<Engraving> = reactive([]) // 장착 각인
  const Accessories: Array<Equipment> = reactive([]) // 장착 악세사리
  const Bracelet: Array<Equipment> = reactive([]) // 팔찌
  const EngravingsColor: string[] = reactive([]) // 각인 이름 색상
  const EnPoint: string[] = reactive([]) // 각인 활성 수치
  const EquipEnforce: string[] = reactive([]) // 강화수치
  const EquipSet: string[] = reactive([]) // 세트옵션 이름
  const EquipSetColor: string[] = reactive([]) // 셋옵 컬러 클래스명
  const EquipClass: string[] = reactive([])
  const Transcendence: string[] = reactive([]) //초월
  const TotalTranscendence = ref() // 초월수치 총합
  const HighEnforce: string[] = reactive([]) // 상급재련 수치
  const AccessoriesStat: string[] = reactive([]) // 악세사리 특성
  const AccessoriesClass: string[] = reactive([]) // 악세사리 클래스
  const BraceletStat: string[] = reactive([]) // 팔찌 스탯
  const BraceletClass = ref() // 팔찌 클래스
  const Stone: string[] = reactive([]) //어빌리티 스톤
  const StoneNum = ref() // 어빌리티 스톤 인덱스
  const StoneClass = ref() // 어빌리티 스톤 클래스
  const Gems: Gem[] = reactive([]) // 보석 기본툴팁
  const GemsClass: string[] = reactive([])
  const GemsEffects: Array<GemEffect> = reactive([]) // 보석 상세 설명

  const addArmory = (data: ArmoryProfile) => {
    Armory.push(data)
  }

  const addGem = (data: ArmoryGem) => {
    for (const i in data['Gems']) {
      Gems.push(data['Gems'][i])
      GemsEffects.push(data['Effects'][i])
    }
    Gems.sort((a, b) => b.Level - a.Level || b.Name.indexOf('멸화'))
    setGemClass(Gems)
  }

  const addEquipment = (data: Equipment[]) => {
    for (const i in data) {
      Equipments.push(data[i])
      if (data[i].Grade == '고대') {
        EquipClass.push('Ancient')
      } else if (data[i].Grade == '유물') {
        EquipClass.push('Relic')
      } else if (data[i].Grade == '전설') {
        EquipClass.push('Legend')
      } else if (data[i].Grade == '영웅') {
        EquipClass.push('Hero')
      } else if (data[i].Grade == '희귀') {
        EquipClass.push('Rare')
      } else if (data[i].Grade == '고급') {
        EquipClass.push('Advanced')
      }
    }
    console.log(data)
    setEquipment(data)
    setAccessories(data)
    setEquipEnforce(data)
    setTranscendence(data)
    setEquipSet(data)
    setHighEnforce(data)
    setAccessoriesStat(data)
    setBracelet(data)
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

  const setGemClass = (gems: Gem[]) => {
    for (const i in gems) {
      if (gems[i].Grade == '유물') {
        GemsClass.push('Relic')
      } else if (gems[i].Grade == '전설') {
        GemsClass.push('Legend')
      } else if (gems[i].Grade == '영웅') {
        GemsClass.push('Hero')
      } else if (gems[i].Grade == '희귀') {
        GemsClass.push('Rare')
      } else if (gems[i].Grade == '고급') {
        GemsClass.push('Advanced')
      }
    }
  }

  const setEquipment = (data: Equipment[]) => {
    for (let i = 0; i < 6; i++) {
      Equipment.push(data[i])
    }
  }

  const setAccessories = (data: Equipment[]) => {
    for (let i = 6; i < 11; i++) {
      if (i == 6 && data[i].Type == '목걸이') {
        Accessories.push(data[i])
        if (data[i].Grade == '고대') {
          AccessoriesClass.push('Ancient')
        } else if (data[i].Grade == '유물') {
          AccessoriesClass.push('Relic')
        } else if (data[i].Grade == '전설') {
          AccessoriesClass.push('Legend')
        } else if (data[i].Grade == '영웅') {
          AccessoriesClass.push('Hero')
        } else if (data[i].Grade == '희귀') {
          AccessoriesClass.push('Rare')
        } else if (data[i].Grade == '고급') {
          AccessoriesClass.push('Advanced')
        } else {
          AccessoriesClass.push('No-item')
        }
      } else if (i == 6 && data[i].Type != '목걸이' && Accessories[i - 6] == undefined) {
        Accessories.push({ Type: '목걸이', Name: 'x', Icon: 'x', Grade: 'x', Tooltip: 'x' })
        AccessoriesClass.push('No-item')
        i--
      } else if (data[i].Type == '귀걸이') {
        Accessories.push(data[i])
        if (data[i].Grade == '고대') {
          AccessoriesClass.push('Ancient')
        } else if (data[i].Grade == '유물') {
          AccessoriesClass.push('Relic')
        } else if (data[i].Grade == '전설') {
          AccessoriesClass.push('Legend')
        } else if (data[i].Grade == '영웅') {
          AccessoriesClass.push('Hero')
        } else if (data[i].Grade == '희귀') {
          AccessoriesClass.push('Rare')
        } else if (data[i].Grade == '고급') {
          AccessoriesClass.push('Advanced')
        } else {
          AccessoriesClass.push('No-item')
        }
      } else if (data[i].Type == '반지' && Accessories.length >= 3) {
        Accessories.push(data[i])
        if (data[i].Grade == '고대') {
          AccessoriesClass.push('Ancient')
        } else if (data[i].Grade == '유물') {
          AccessoriesClass.push('Relic')
        } else if (data[i].Grade == '전설') {
          AccessoriesClass.push('Legend')
        } else if (data[i].Grade == '영웅') {
          AccessoriesClass.push('Hero')
        } else if (data[i].Grade == '희귀') {
          AccessoriesClass.push('Rare')
        } else if (data[i].Grade == '고급') {
          AccessoriesClass.push('Advanced')
        } else {
          AccessoriesClass.push('No-item')
        }
      } else if (data[i].Type == '반지' && Accessories.length < 3) {
        Accessories.push({ Type: '귀걸이', Name: 'x', Icon: 'x', Grade: 'x', Tooltip: 'x' })
        AccessoriesClass.push('No-item')
        Accessories.push(data[i])
        if (data[i].Grade == '고대') {
          AccessoriesClass.push('Ancient')
        } else if (data[i].Grade == '유물') {
          AccessoriesClass.push('Relic')
        } else if (data[i].Grade == '전설') {
          AccessoriesClass.push('Legend')
        } else if (data[i].Grade == '영웅') {
          AccessoriesClass.push('Hero')
        } else if (data[i].Grade == '희귀') {
          AccessoriesClass.push('Rare')
        } else if (data[i].Grade == '고급') {
          AccessoriesClass.push('Advanced')
        } else {
          AccessoriesClass.push('No-item')
        }
      } else if (data[i].Type != '반지' && data[i].Type != '목걸이' && data[i].Type != '귀걸이') {
        break
      }
    }
  }

  const setAccessoriesStat = (data: Equipment[]) => {
    for (let i = 6; i < 11; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      const txt = tool['Element_005']['value']['Element_001']
      if (i == 6 && data[i].Type == '목걸이') {
        AccessoriesStat.push(txt)
      } else if (i == 6 && data[i].Type != '목걸이' && AccessoriesStat[i - 6] == undefined) {
        AccessoriesStat.push('x')
        i--
      } else if (data[i].Type == '귀걸이') {
        AccessoriesStat.push(txt)
      } else if (data[i].Type == '반지' && AccessoriesStat.length >= 3) {
        AccessoriesStat.push(txt)
      } else if (data[i].Type == '반지' && AccessoriesStat.length < 3) {
        AccessoriesStat.push('x')
        AccessoriesStat.push(txt)
      } else if (data[i].Type != '반지' && data[i].Type != '목걸이' && data[i].Type != '귀걸이') {
        break
      }
    }
  }

  const setBracelet = (data: Equipment[]) => {
    let a = 0
    for (const i in data) {
      if (data[i]['Type'] == '팔찌') {
        Bracelet.push(data[i])
        a = parseInt(i)
        if (data[i].Grade == '고대') {
          BraceletClass.value = 'Ancient'
        } else if (data[i].Grade == '유물') {
          BraceletClass.value = 'Relic'
        }
      }
    }
    if (a == 0) {
      Bracelet.push({ Grade: 'x', Icon: 'x', Name: 'x', Tooltip: 'x', Type: 'x' })
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
    for (let i = 6; i < 12; i++) {
      if (data[i]['Type'] == '어빌리티 스톤') {
        StoneNum.value = i
      }
    }
    if (StoneNum.value != undefined) {
      if (data[StoneNum.value].Grade == '고대') {
        StoneClass.value = 'Ancient'
      } else if (data[StoneNum.value].Grade == '유물') {
        StoneClass.value = 'Relic'
      } else if (data[StoneNum.value].Grade == '전설') {
        StoneClass.value = 'Legend'
      } else if (data[StoneNum.value].Grade == '영웅') {
        StoneClass.value = 'Hero'
      } else if (data[StoneNum.value].Grade == '희귀') {
        StoneClass.value = 'Rare'
      } else if (data[StoneNum.value].Grade == '고급') {
        StoneClass.value = 'Advanced'
      } else {
        StoneClass.value = 'No-item'
      }
      const tool = JSON.parse(data[StoneNum.value]['Tooltip'])
      const st =
        tool['Element_006']['value']['Element_000']['contentStr']['Element_000']['contentStr']
      Stone.push(st.replace(']', '').replace('[', '').replace('활성도', ''))
      const st1 =
        tool['Element_006']['value']['Element_000']['contentStr']['Element_001']['contentStr']
      Stone.push(st1.replace(']', '').replace('[', '').replace('활성도', ''))
      const st2 =
        tool['Element_006']['value']['Element_000']['contentStr']['Element_002']['contentStr']
      Stone.push(st2.replace(']', '').replace('[', '').replace('활성도', ''))
    } else {
      StoneClass.value = 'No-item'
    }
  }

  const setEquipEnforce = (data: Equipment[]) => {
    for (let i = 0; i < 6; i++) {
      const tool = data[i].Name
      const txt = tool.replace(/[^0-9]/g, '')
      if (txt == '') {
        EquipEnforce.push('')
      } else {
        EquipEnforce.push('+' + txt)
      }
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
      } else if (
        tool['Element_008']['type'] == 'SingleTextBox' &&
        tool['Element_008']['value']['Element_000'] != undefined &&
        tool['Element_008']['value']['Element_000']['topStr'] != undefined
      ) {
        const st2 = tool['Element_008']['value']['Element_000']['topStr'].indexOf('</img>')
        const txt2 = tool['Element_008']['value']['Element_000']['topStr']?.substring(
          st2 + 6,
          st2 + 8
        )
        a += parseInt(txt2)
        Transcendence.push(txt2)
      } else if (
        tool['Element_007']['type'] == 'Progress' &&
        tool['Element_008']['type'] == 'IndentStringGroup'
      ) {
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
    deleteGem()
  }

  const deleteArmory = () => {
    Armory.splice(0)
  }
  const deleteEquipmnet = () => {
    Equipment.splice(0)
    Equipments.splice(0)
    EquipSet.splice(0)
    EquipSetColor.splice(0)
    EquipClass.splice(0)
    EquipEnforce.splice(0)
    HighEnforce.splice(0)
  }
  const deleteEn = () => {
    Effects.splice(0)
    Engravings.splice(0)
    EnPoint.splice(0)
  }
  const deleteAccessorie = () => {
    Accessories.splice(0)
    AccessoriesClass.splice(0)
    AccessoriesStat.splice(0)
    BraceletStat.splice(0)
    Bracelet.splice(0)
    BraceletClass.value = ''
  }

  const deleteTranscendence = () => {
    Transcendence.splice(0)
  }
  const deleteStone = () => {
    Stone.splice(0)
    StoneClass.value = ''
    StoneNum.value = undefined
  }

  const deleteGem = () => {
    Gems.splice(0)
    GemsClass.splice(0)
    GemsEffects.splice(0)
  }

  return {
    Armory,
    Equipment,
    Equipments,
    EquipClass,
    addArmory,
    addGem,
    Effects,
    Engravings,
    EngravingsColor,
    Stone,
    StoneNum,
    StoneClass,
    GemsEffects,
    Gems,
    GemsClass,
    EnPoint,
    Transcendence,
    TotalTranscendence,
    EquipEnforce,
    HighEnforce,
    Accessories,
    AccessoriesStat,
    AccessoriesClass,
    Bracelet,
    BraceletStat,
    BraceletClass,
    EquipSet,
    EquipSetColor,
    deleteAll,
    addEquipment,
    addEngraving
  }
})
