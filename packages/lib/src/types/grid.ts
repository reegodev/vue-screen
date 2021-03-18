import {
  GridTypeTailwindName,
  Tailwind,
  GridTypeBootstrapName,
  Bootstrap,
  GridTypeBulmaName,
  Bulma,
  GridTypeFoundationName,
  Foundation,
  GridTypeMaterializeName,
  Materialize,
  GridTypeSemanticUiName,
  SemanticUi,
} from '../grids'

export type Custom = Record<string, number | string>
export type CustomObject = Record<string, boolean>

export type SupportedGridType =
  Tailwind 
  | Bootstrap 
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
  T extends GridTypeBulmaName ? Bulma :
  T extends GridTypeFoundationName ? Foundation :
  T extends GridTypeMaterializeName ? Materialize :
  T extends GridTypeSemanticUiName ? SemanticUi :
  never

export type GridObjectLiteral<T> =
  T extends GridTypeTailwindName ? Record<keyof Tailwind, boolean> & BaseObject<Tailwind> :
  T extends GridTypeBootstrapName ? Record<keyof Bootstrap, boolean> & BaseObject<Bootstrap> :
  T extends GridTypeBulmaName ? Record<keyof Bulma, boolean> & BaseObject<Bulma> :
  T extends GridTypeFoundationName ? Record<keyof Foundation, boolean> & BaseObject<Foundation> :
  T extends GridTypeMaterializeName ? Record<keyof Materialize, boolean> & BaseObject<Materialize> :
  T extends GridTypeSemanticUiName ? Record<keyof SemanticUi, boolean> & BaseObject<SemanticUi> :
  never

export type GridDefinitionCustomObject = Custom
export type GridDefinitionLiteral = 
  GridTypeTailwindName
  | GridTypeBootstrapName 
  | GridTypeBulmaName 
  | GridTypeFoundationName
  | GridTypeMaterializeName
  | GridTypeSemanticUiName

export type GridDefinition = GridDefinitionLiteral | GridDefinitionCustomObject


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $grid: Readonly<Record<keyof Custom, boolean> & BaseObject<Custom>>
  }
}
