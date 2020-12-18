import { ComponentBounds, Hookable } from './hooks'
import { Context } from './context'
import { ComponentInstance, ComponentState, StateBase } from './component'

export interface DevtoolsPluginApi {
  on: Hookable<Context>
  notifyComponentUpdate (instance: ComponentInstance)
  addTimelineLayer (options: TimelineLayerOptions)
  addTimelineEvent (options: TimelineEventOptions)
  addInspector (options: CustomInspectorOptions)
  sendInspectorTree (inspectorId: string)
  sendInspectorState (inspectorId: string)
}

export interface AppRecord {
  id: number
  name: string
  instanceMap: Map<string, ComponentInstance>
  rootInstance: ComponentInstance
}

export interface TimelineLayerOptions<TData = any, TMeta = any> {
  id: string
  label: string
  color: number
  screenshotOverlayRender?: (event: TimelineEvent<TData, TMeta> & ScreenshotOverlayEvent, ctx: ScreenshotOverlayRenderContext) => ScreenshotOverlayRenderResult | Promise<ScreenshotOverlayRenderResult>
}

export interface ScreenshotOverlayEvent {
  layerId: string
}

export interface ScreenshotOverlayRenderContext {
  screenshot: ScreenshotData
  index: number
}

export type ScreenshotOverlayRenderResult = HTMLElement | string | false

export interface ScreenshotData {
  time: number
  events: (TimelineEvent & ScreenshotOverlayEvent)[]
}

export interface TimelineEventOptions {
  layerId: string
  event: TimelineEvent
  all?: boolean
}

export interface TimelineEvent<TData = any, TMeta = any> {
  time: number
  data: TData
  logType?: 'default' | 'warning' | 'error'
  meta?: TMeta
  groupId?: string | number
  title?: string
  subtitle?: string
}

export interface CustomInspectorOptions {
  id: string
  label: string
  icon?: string
  treeFilterPlaceholder?: string
  stateFilterPlaceholder?: string
}

export interface CustomInspectorNode {
  id: string
  label: string
  children?: CustomInspectorNode[]
  tags?: InspectorNodeTag[]
}

export interface InspectorNodeTag {
  label: string
  textColor: number
  backgroundColor: number
}

export interface CustomInspectorState {
  [key: string]: (StateBase | ComponentState)[]
}
