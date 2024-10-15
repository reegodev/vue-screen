import {
  GridTypeTailwindName,
  Tailwind,
  GridTypeBootstrapName,
  GridTypeBootstrap3Name,
  Bootstrap,
  GridTypeBootstrap4Name,
  Bootstrap4,
  GridTypeBootstrap5Name,
  Bootstrap5,
  GridTypeBulmaName,
  Bulma,
  GridTypeFoundationName,
  Foundation,
  GridTypeMaterializeName,
  Materialize,
  GridTypeSemanticUiName,
  SemanticUi,
} from '../grids'

export type ComputedBreakpoint = (grid: GridObject<Custom>) => boolean

export type Custom = Record<string, number | string | ComputedBreakpoint>
export type CustomObject = Record<string, boolean>

export type SupportedGridType =
  Tailwind 
  | Bootstrap 
  | Bootstrap 
  | Bootstrap4 
  | Bootstrap5 
  | Bulma 
  | Foundation 
  | Materialize 
  | SemanticUi
  | Custom

export type GridTypes = SupportedGridType | Custom

export type BaseObject<T> = { breakpoint: keyof T }
export type GridType<T extends GridTypes> = Record<keyof T, string | number>
export type GridObject<T extends GridTypes> = Record<keyof T, boolean>  & BaseObject<T>

export type GridTypeLiteral<T> =
  T extends GridTypeTailwindName ? Tailwind :
  T extends GridTypeBootstrapName ? Bootstrap :
  T extends GridTypeBootstrap3Name ? Bootstrap :
  T extends GridTypeBootstrap4Name ? Bootstrap4 :
  T extends GridTypeBootstrap5Name ? Bootstrap5 :
  T extends GridTypeBulmaName ? Bulma :
  T extends GridTypeFoundationName ? Foundation :
  T extends GridTypeMaterializeName ? Materialize :
  T extends GridTypeSemanticUiName ? SemanticUi :
  never

export type GridObjectLiteral<T> =
  T extends GridTypeTailwindName ? Record<keyof Tailwind, boolean> & BaseObject<Tailwind> :
  T extends GridTypeBootstrapName ? Record<keyof Bootstrap, boolean> & BaseObject<Bootstrap> :
  T extends GridTypeBootstrap3Name ? Record<keyof Bootstrap, boolean> & BaseObject<Bootstrap> :
  T extends GridTypeBootstrap4Name ? Record<keyof Bootstrap4, boolean> & BaseObject<Bootstrap4> :
  T extends GridTypeBootstrap5Name ? Record<keyof Bootstrap4, boolean> & BaseObject<Bootstrap5> :
  T extends GridTypeBulmaName ? Record<keyof Bulma, boolean> & BaseObject<Bulma> :
  T extends GridTypeFoundationName ? Record<keyof Foundation, boolean> & BaseObject<Foundation> :
  T extends GridTypeMaterializeName ? Record<keyof Materialize, boolean> & BaseObject<Materialize> :
  T extends GridTypeSemanticUiName ? Record<keyof SemanticUi, boolean> & BaseObject<SemanticUi> :
  never

export type GridDefinitionCustomObject = Custom
export type GridDefinitionLiteral = 
  GridTypeTailwindName
  | GridTypeBootstrapName 
  | GridTypeBootstrap3Name 
  | GridTypeBootstrap4Name 
  | GridTypeBootstrap5Name 
  | GridTypeBulmaName 
  | GridTypeFoundationName
  | GridTypeMaterializeName
  | GridTypeSemanticUiName

export type GridDefinition = GridDefinitionLiteral | GridDefinitionCustomObject


declare module 'vue' {
  interface ComponentCustomProperties {
    $grid: Readonly<Record<keyof Custom, boolean> & BaseObject<Custom>>
  }
}
