export interface ScreenObject {
  resolution: string
  width: number
  height: number
  orientation: string
  portrait: boolean
  landscape: boolean
  touch: boolean
}

export interface ScreenConfig {
  width?: number
  height?: number
  orientation?: 'portrait' | 'landscape'
  touch?: boolean
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $screen: Readonly<ScreenObject>
  }
}