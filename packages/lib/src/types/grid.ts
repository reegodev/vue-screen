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


export type SupportedGridType =
  Tailwind 
  | Bootstrap 
  | Bulma 
  | Foundation 
  | Materialize 
  | SemanticUi
  | Custom

export type GridTypes = SupportedGridType | Custom

export type GridType<T extends GridTypes> = Record<keyof T, string | number>

export interface GridObjectStatic {
  breakpoint: string
}
export type GridObject<T extends GridTypes> = Record<keyof T, boolean> | GridObjectStatic

export type CustomObject = Record<string, boolean> | GridObjectStatic

export type GridTypeLiteral<T> =
  T extends GridTypeTailwindName ? Tailwind :
  T extends GridTypeBootstrapName ? Bootstrap :
  T extends GridTypeBulmaName ? Bulma :
  T extends GridTypeFoundationName ? Foundation :
  T extends GridTypeMaterializeName ? Materialize :
  T extends GridTypeSemanticUiName ? SemanticUi :
  never

export type GridObjectLiteral<T> =
  T extends GridTypeTailwindName ? Record<keyof Tailwind, boolean> :
  T extends GridTypeBootstrapName ? Record<keyof Bootstrap, boolean> :
  T extends GridTypeBulmaName ? Record<keyof Bulma, boolean> :
  T extends GridTypeFoundationName ? Record<keyof Foundation, boolean> :
  T extends GridTypeMaterializeName ? Record<keyof Materialize, boolean> :
  T extends GridTypeSemanticUiName ? Record<keyof SemanticUi, boolean> :
  never

export type GridDefinitionCustomObject = Custom
export type GridDefinitionLiteral = 
  GridTypeTailwindName
  | GridTypeBootstrapName 
  | GridTypeBulmaName 
  | GridTypeFoundationName
  | GridTypeMaterializeName
  | GridTypeSemanticUiName

export type GridDefinition = GridDefinitionCustomObject | GridDefinitionLiteral
