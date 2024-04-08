export interface ArmoryProfile {
  CharacterImage: string
  ExpeditionLevel: number
  PvpGradeName: string
  TownLevel?: number
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: stat[]
  Tendencies: Tendencies[]
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}

export interface Equipment {
  Type: string
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
}

export interface stat {
  Type: string
  value: string
  Tooltip: Array<string>
}

export interface Tendencies {
  Type: string
  Point: number
  MaxPoint: number
}

export interface ArmoryEngraving {
  Engravings: Engraving
  Effects: EngravingEffect
}

export interface Engraving {
  slot: number
  Name: string
  Icon: string
  Tooltip: string
}

export interface EngravingEffect {
  Icon: string
  Name: string
  Description: string
}

export interface GemEffect {
  GemSlot: number
  Name: string
  Description: string
  Icon: string
  Tooltip: string
}

export interface Gem {
  Slot: number
  Name: string
  Icon: string
  Level: number
  Grade: string
  Tooltip: string
}

export interface ArmoryGem {
  Effects: GemEffect[]
  Gems: Gem[]
}

export interface ArmoryCard {
  Cards: Card[]
  Effects: CardEffects
}

export interface Card {
  Slot: number
  Name: string
  Icon: string
  AwakeCount: number
  AwakeTotal: number
  Grade: string
  Tooltip: string
}

export interface CardEffects {
  index: number
  CardSlots: [number]
  items: CardEffect
}

export interface CardEffect {
  Name: string
  Description: string
}

export interface Stat {
  Type: string
  Value: string
  Tooltip: [string]
}

export interface Tendencies {
  Type: string
  Point: number
  MaxPoint: number
}

export interface Collectible {
  Type: string
  Icon: string
  Point: number
  MaxPoint: number
  CollectiblePoints: CollectiblePoint
}

export interface CollectiblePoint {
  PointName: string
  Point: number
  MaxPoint: number
}

export interface ArmorySkills {
  Name: string
  Icon: string
  Level: number
  Type: string
  IsAwakening: boolean
  Tripods: SkillTripod
  Rune: SkillRune
  Tooltip: string
}

export interface SkillTripod {
  Tier: number
  Slot: number
  Name: string
  Icon: string
  Level: number
  IsSelected: boolean
  Tooltip: string
}

export interface SkillRune {
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
}
