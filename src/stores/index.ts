import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  ArmoryCard,
  ArmoryGem,
  ArmoryProfile,
  ArmorySkills,
  Engraving,
  EngravingEffect,
  Equipment,
  Gem,
  GemEffect,
  Card,
  Stat,
  Tendencies,
  CardEffect,
  Collectible
} from '@/types'

export const useCharStore = defineStore('char', () => {
  const Armory: ArmoryProfile[] = reactive([]) // 캐릭터 프로필
  const Stats: Stat[] = reactive([]) // 능력치
  const Tendencies: Tendencies[] = reactive([]) // 성향
  const Equipments: Array<Equipment> = reactive([]) // 장비하고있는 모든것
  const Equipment: Array<Equipment> = reactive([]) // 방어구 및 무기
  const EquipmentQV: number[] = reactive([]) // 방어구 및 무기 품질
  const EquipmentQVClass: string[] = reactive([]) // 방어구 및 무기 품질 클래스
  const Effects: Array<EngravingEffect> = reactive([]) // 총 장착 각인
  const Engravings: Array<Engraving> = reactive([]) // 장착 각인
  const Accessories: Array<Equipment> = reactive([]) // 장착 악세사리
  const AccessoriesEngraving: string[] = reactive([]) // 장착 악세사리 각인
  const AccessoriesQV: number[] = reactive([]) // 악세사리 품질
  const AccessoriesQVClass: string[] = reactive([]) // 악세사리 품질 클래스
  const Bracelet: Array<Equipment> = reactive([]) // 팔찌
  const EngravingsColor: string[] = reactive([]) // 각인 이름 색상
  const EnPoint: string[] = reactive([]) // 각인 활성 수치
  const EquipEnforce: string[] = reactive([]) // 강화수치
  const EquipSet: string[] = reactive([]) // 세트옵션 이름
  const EquipSetColor: string[] = reactive([]) // 셋옵 컬러 클래스명
  const EquipClass: string[] = reactive([]) // 장비 클래스명
  const Elixir: string[] = reactive([]) // 엘릭서
  const ElixirClass: string[] = reactive([]) // 엘릭서클래스
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
  const GemsClass: string[] = reactive([]) // 보석 css클래스명
  const GemsModal: boolean[] = reactive([]) // 보석 모달컨트롤용
  const GemsEffects: Array<GemEffect> = reactive([]) // 보석 상세 설명
  const Cards: Array<Card> = reactive([]) // 카드
  const CardEffects: CardEffect[] = reactive([]) // 카드 효과
  const CardAwake: string[] = reactive([]) // 카드 각성 단계
  const Collectibles: Collectible[] = reactive([]) // 수집형
  const mode = ref('장비')
  const Skills: ArmorySkills[] = reactive([]) // 스킬
  const SkillRuneClass: string[] = reactive([]) // 룬 클래스
  const ColletiblesName: string[] = reactive([
    '모코코',
    '섬마',
    '미술품',
    '거심',
    '이그네아',
    '모험물',
    '세계수',
    '오페별',
    '오르골'
  ])

  /*모달 켜기*/
  const OverModal = (a: number) => {
    GemsModal[a] = true
  }
  /*모달 끄기 */
  const LeaveModal = (a: number) => {
    GemsModal[a] = false
  }
  /*프로필 정보 */
  const addArmory = (data: ArmoryProfile) => {
    Armory.push(data)
    setStats(data)
    setTendencies(data)
  }

  /*수집품  */
  const addCollectible = (data: Collectible) => {
    for (const i of data) {
      Collectibles.push(i)
    }
  }
  /*스탯 */
  const setStats = (data: ArmoryProfile) => {
    for (const i of data['Stats']) {
      Stats.push(i)
    }
  }
  /*성향 */
  const setTendencies = (data: ArmoryProfile) => {
    for (const i of data['Tendencies']) {
      Tendencies.push(i)
    }
  }
  /*장착 장비 */
  const addEquipment = (data: Equipment[]) => {
    for (const i of data) {
      Equipments.push(i)
      if (i.Grade == '에스더') {
        EquipClass.push('Esther')
      } else if (i.Grade == '고대') {
        EquipClass.push('Ancient')
      } else if (i.Grade == '유물') {
        EquipClass.push('Relic')
      } else if (i.Grade == '전설') {
        EquipClass.push('Legend')
      } else if (i.Grade == '영웅') {
        EquipClass.push('Hero')
      } else if (i.Grade == '희귀') {
        EquipClass.push('Rare')
      } else if (i.Grade == '고급') {
        EquipClass.push('Advanced')
      }
    }
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
    setElixir(data)
  }

  /*장비 세트 */
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

  /*장착 장비 및 품질 */
  const setEquipment = (data: Equipment[]) => {
    for (let i = 0; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      Equipment.push(data[i])
      EquipmentQV.push(tool['Element_001']['value']['qualityValue'])
      if (EquipmentQV[i] == 100) {
        EquipmentQVClass.push('QV-100')
      } else if (EquipmentQV[i] >= 90) {
        EquipmentQVClass.push('QV-90')
      } else if (EquipmentQV[i] >= 70) {
        EquipmentQVClass.push('QV-70')
      } else if (EquipmentQV[i] >= 30) {
        EquipmentQVClass.push('QV-30')
      } else {
        EquipmentQVClass.push('QV-0')
      }
    }
  }

  /*재련 */
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
  /*상급재련 */
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
  /*초월 */
  const setTranscendence = (data: Equipment[]) => {
    let a = 0
    for (let i = 0; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      if (
        (tool['Element_005']['type'] == 'SingleTextBox' &&
          tool['Element_008']['type'] == 'Progress') ||
        data[i].Grade == '에스더'
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
        tool['Element_008']['type'] == 'IndentStringGroup' &&
        data[i].Grade != '에스더'
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
        tool['Element_008']['value']['Element_000']['topStr'] != undefined &&
        data[i].Grade != '에스더'
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
        tool['Element_008']['type'] == 'IndentStringGroup' &&
        tool['Element_008']['value']['Element_000']['topStr'].indexOf('초월') != -1
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

  /*엘릭서 */
  const setElixir = (data: Equipment[]) => {
    let Elixir1 = ''
    let Elixir2 = ''
    let totalElixir = 0
    for (let i = 1; i < 6; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      if (
        tool['Element_005']['type'] == 'SingleTextBox' &&
        tool['Element_008']['type'] == 'Progress'
      ) {
        const st = tool['Element_010']['value']['Element_000']['contentStr']
        const idx1 = st['Element_000']['contentStr'].replace(/(<([^>]+)>)/gi, '').indexOf('Lv.')
        const idx2 = st['Element_001']['contentStr'].replace(/(<([^>]+)>)/gi, '').indexOf('Lv.')
        const txt1 = st['Element_000']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .substring(5, idx1 + 4)
        const txt2 = st['Element_001']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .substring(5, idx2 + 4)
        Elixir.push([txt1, txt2])
      } else if (
        tool['Element_005']['type'] == 'SingleTextBox' &&
        tool['Element_008']['type'] != 'Progress' &&
        tool['Element_009']['type'] == 'IndentStringGroup'
      ) {
        const st = tool['Element_009']['value']['Element_000']['contentStr']
        const idx1 = st['Element_000']['contentStr'].replace(/(<([^>]+)>)/gi, '').indexOf('Lv.')
        const idx2 = st['Element_001']['contentStr'].replace(/(<([^>]+)>)/gi, '').indexOf('Lv.')
        const txt1 = st['Element_000']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .substring(5, idx1 + 4)
        const txt2 = st['Element_001']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .substring(5, idx2 + 4)
        Elixir.push([txt1, txt2])
      }
    }
    Elixir.forEach((a, b) => {
      for (let i = 0; i < a.length; i++) {
        totalElixir += parseInt(a[i].substring(a[i].length - 1))
        if (b == 0) {
          if (a[i].indexOf('달인') != -1) {
            Elixir1 = '달인'
          } else if (a[i].indexOf('회심') != -1) {
            Elixir1 = '회심'
          } else if (a[i].indexOf('선봉대') != -1) {
            Elixir1 = '선봉대'
          } else if (a[i].indexOf('진군') != -1) {
            Elixir1 = '진군'
          } else if (a[i].indexOf('선각자') != -1) {
            Elixir1 = '선각자'
          }
        } else if (b == 3) {
          if (a[i].indexOf('달인') != -1) {
            Elixir2 = '달인'
          } else if (a[i].indexOf('회심') != -1) {
            Elixir2 = '회심'
          } else if (a[i].indexOf('선봉대') != -1) {
            Elixir2 = '선봉대'
          } else if (a[i].indexOf('진군') != -1) {
            Elixir2 = '진군'
          } else if (a[i].indexOf('선각자') != -1) {
            Elixir2 = '선각자'
          }
        }
      }
    })
    if (Elixir1 == Elixir2) {
      Elixir.unshift([Elixir1, '연성합계 ' + totalElixir])
      if (Elixir1 == '달인') {
        ElixirClass.push('swell')
      } else if (Elixir1 == '회심') {
        ElixirClass.push('conversion')
      } else if (Elixir1 == '선봉대') {
        ElixirClass.push('vanguard')
      } else if (Elixir1 == '진군' || Elixir1 == '선각자') {
        ElixirClass.push('suport')
      }
    }
  }

  /*각인 */
  const addEngraving = (Effect: EngravingEffect[], Engraving: Engraving[]) => {
    for (const i of Effect) {
      Effects.push(i)
    }
    for (const i of Engraving) {
      Engravings.push(i)
      getEngravingPoint(i.Tooltip)
    }
  }

  /*장착 각인 활성도 */
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

  /*악세사리 */
  const setAccessories = (data: Equipment[]) => {
    for (let i = 6; i < 11; i++) {
      if (i == 6 && data[i].Type == '목걸이') {
        Accessories.push(data[i])
        setAccessoriesClass(data[i])
      } else if (i == 6 && data[i].Type != '목걸이' && Accessories[i - 6] == undefined) {
        Accessories.push({ Type: '목걸이', Name: 'x', Icon: 'x', Grade: 'x', Tooltip: 'x' })
        AccessoriesClass.push('No-item')
        i--
      } else if (data[i].Type == '귀걸이') {
        Accessories.push(data[i])
        setAccessoriesClass(data[i])
      } else if (data[i].Type == '반지' && Accessories.length >= 3) {
        Accessories.push(data[i])
        setAccessoriesClass(data[i])
      } else if (data[i].Type == '반지' && Accessories.length < 3) {
        Accessories.push({ Type: '귀걸이', Name: 'x', Icon: 'x', Grade: 'x', Tooltip: 'x' })
        AccessoriesClass.push('No-item')
        Accessories.push(data[i])
        setAccessoriesClass(data[i])
      } else if (data[i].Type != '반지' && data[i].Type != '목걸이' && data[i].Type != '귀걸이') {
        break
      }
    }
  }
  /*악세 등급 클래스명 */
  const setAccessoriesClass = (data: Equipment) => {
    if (data.Grade == '고대') {
      AccessoriesClass.push('Ancient')
    } else if (data.Grade == '유물') {
      AccessoriesClass.push('Relic')
    } else if (data.Grade == '전설') {
      AccessoriesClass.push('Legend')
    } else if (data.Grade == '영웅') {
      AccessoriesClass.push('Hero')
    } else if (data.Grade == '희귀') {
      AccessoriesClass.push('Rare')
    } else if (data.Grade == '고급') {
      AccessoriesClass.push('Advanced')
    } else {
      AccessoriesClass.push('No-item')
    }
  }
  /*악세사리 스탯 및 품질 및 각인 */
  const setAccessoriesStat = (data: Equipment[]) => {
    for (let i = 6; i < 11; i++) {
      const tool = JSON.parse(data[i]['Tooltip'])
      const txt = tool['Element_005']['value']['Element_001']
      const txt1 = tool['Element_006']['value']['Element_000']['contentStr']
      let ac1 = ''
      let ac2 = ''
      if (i == 6 && data[i].Type == '목걸이') {
        AccessoriesStat.push(txt)
        AccessoriesQV.push(tool['Element_001']['value']['qualityValue'])
        ac1 = txt1['Element_000']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        ac2 = txt1['Element_001']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        AccessoriesEngraving.push([ac1, ac2])
      } else if (i == 6 && data[i].Type != '목걸이' && AccessoriesStat[i - 6] == undefined) {
        AccessoriesStat.push('x')
        AccessoriesQV.push(0)
        AccessoriesEngraving.push(['x', 'x'])
        i--
      } else if (data[i].Type == '귀걸이') {
        AccessoriesStat.push(txt)
        AccessoriesQV.push(tool['Element_001']['value']['qualityValue'])
        ac1 = txt1['Element_000']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        ac2 = txt1['Element_001']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        AccessoriesEngraving.push([ac1, ac2])
      } else if (data[i].Type == '반지' && AccessoriesStat.length >= 3) {
        AccessoriesStat.push(txt)
        AccessoriesQV.push(tool['Element_001']['value']['qualityValue'])
        ac1 = txt1['Element_000']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        ac2 = txt1['Element_001']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        AccessoriesEngraving.push([ac1, ac2])
      } else if (data[i].Type == '반지' && AccessoriesStat.length < 3) {
        AccessoriesStat.push('x')
        AccessoriesStat.push(txt)
        AccessoriesQV.push(0)
        AccessoriesQV.push(tool['Element_001']['value']['qualityValue'])
        AccessoriesEngraving.push(['x', 'x'])
        ac1 = txt1['Element_000']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        ac2 = txt1['Element_001']['contentStr']
          .replace(/(<([^>]+)>)/gi, '')
          .replace('[', '')
          .replace(']', '')
          .replace('활성도', '')
        AccessoriesEngraving.push([ac1, ac2])
      } else if (data[i].Type != '반지' && data[i].Type != '목걸이' && data[i].Type != '귀걸이') {
        break
      }
    }
    AccessoriesQV.forEach((i) => {
      if (i == 100) {
        AccessoriesQVClass.push('QV-100')
      } else if (i >= 90) {
        AccessoriesQVClass.push('QV-90')
      } else if (i >= 70) {
        AccessoriesQVClass.push('QV-70')
      } else if (i >= 30) {
        AccessoriesQVClass.push('QV-30')
      } else {
        AccessoriesQVClass.push('QV-0')
      }
    })
  }
  /*팔찌 */
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

  /*팔찌 스탯 */
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
  /*어빌리티 스톤 */
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

  /*보석 */
  const addGem = (data: ArmoryGem) => {
    for (const i in data['Gems']) {
      Gems.push(data['Gems'][i])
    }
    Gems.sort((a, b) => b.Level - a.Level || b.Name.indexOf('멸화'))
    setGemClass(Gems)
    Gems.forEach((a) => {
      for (const i of data['Effects']) {
        if (i.GemSlot == a.Slot) {
          GemsEffects.push(i)
        }
      }
      GemsModal.push(false)
    })
  }
  /*보석 클래스*/
  const setGemClass = (gems: Gem[]) => {
    for (const i of gems) {
      if (i.Grade == '유물') {
        GemsClass.push('Relic')
      } else if (i.Grade == '전설') {
        GemsClass.push('Legend')
      } else if (i.Grade == '영웅') {
        GemsClass.push('Hero')
      } else if (i.Grade == '희귀') {
        GemsClass.push('Rare')
      } else if (i.Grade == '고급') {
        GemsClass.push('Advanced')
      }
    }
  }

  /*카드 */
  const addCard = (data: ArmoryCard) => {
    for (const i of data['Cards']) {
      Cards.push(i)
      if (i['AwakeCount'] == 5) {
        CardAwake.push(['ca', 'ca', 'ca', 'ca', 'ca'])
      } else if (i['AwakeCount'] == 4) {
        CardAwake.push(['ca', 'ca', 'ca', 'ca', 'cna'])
      } else if (i['AwakeCount'] == 3) {
        CardAwake.push(['ca', 'ca', 'ca', 'cna', 'cna'])
      } else if (i['AwakeCount'] == 2) {
        CardAwake.push(['ca', 'ca', 'cna', 'cna', 'cna'])
      } else if (i['AwakeCount'] == 1) {
        CardAwake.push(['ca', 'cna', 'cna', 'cna', 'cna'])
      } else if (i['AwakeCount'] == 0) {
        CardAwake.push(['cna', 'cna', 'cna', 'cna', 'cna'])
      }
    }
    const ce = data['Effects']
    ce.forEach((a) => {
      for (const b of a['Items']) {
        CardEffects.push(b)
      }
    })
  }

  /* 스킬 추가*/
  const addSkill = (data: ArmorySkills) => {
    data.forEach((a) => {
      if (a.Level != 1 || a.IsAwakening == true || a.Rune != null) {
        Skills.push(a)
      }
    })
    Skills.sort((a, b) => b.Level - a.Level)
    console.log(Skills)

    Skills.forEach((a) => {
      if (a.Rune != null) {
        if (a.Rune.Grade == '유물') {
          SkillRuneClass.push('Relic')
        } else if (a.Rune.Grade == '전설') {
          SkillRuneClass.push('Legend')
        } else if (a.Rune.Grade == '영웅') {
          SkillRuneClass.push('Hero')
        } else if (a.Rune.Grade == '희귀') {
          SkillRuneClass.push('Rare')
        } else if (a.Rune.Grade == '고급') {
          SkillRuneClass.push('Advanced')
        }
      }
    })
  }

  const deleteAll = () => {
    deleteArmory()
    deleteEquipmnet()
    deleteEn()
    deleteAccessorie()
    deleteTranscendence()
    deleteStone()
    deleteGem()
    deleteCard()
    deleteStats()
    deleteCollectibles()
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
    Elixir.splice(0)
    ElixirClass.splice(0)
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
    AccessoriesEngraving.splice(0)
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

  const deleteCard = () => {
    Cards.splice(0)
    CardAwake.splice(0)
    CardEffects.splice(0)
  }

  const deleteStats = () => {
    Stats.splice(0)
    Tendencies.splice(0)
  }

  const deleteCollectibles = () => {
    Collectibles.splice(0)
  }

  return {
    Armory,
    Stats,
    mode,
    Tendencies,
    Equipment,
    Equipments,
    EquipmentQV,
    EquipmentQVClass,
    EquipClass,
    addArmory,
    addGem,
    addCard,
    addSkill,
    Cards,
    Skills,
    SkillRuneClass,
    OverModal,
    LeaveModal,
    CardEffects,
    Collectibles,
    ColletiblesName,
    CardAwake,
    Effects,
    Engravings,
    EngravingsColor,
    Stone,
    StoneNum,
    StoneClass,
    GemsEffects,
    Gems,
    GemsClass,
    GemsModal,
    EnPoint,
    Transcendence,
    TotalTranscendence,
    Elixir,
    ElixirClass,
    EquipEnforce,
    HighEnforce,
    Accessories,
    AccessoriesStat,
    AccessoriesClass,
    AccessoriesQV,
    AccessoriesQVClass,
    AccessoriesEngraving,
    Bracelet,
    BraceletStat,
    BraceletClass,
    EquipSet,
    EquipSetColor,
    deleteAll,
    addEquipment,
    addCollectible,
    addEngraving
  }
})
