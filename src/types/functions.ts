import { DraggableData } from 'react-draggable'
import { INode, IPort } from './chart'
import { IConfig } from './config'
import { IOffset, IPosition, ISize } from './generics'
import {IChart} from './chart'

export type IOnDragNode = (input: { config?: IConfig, event: MouseEvent, data: DraggableData, id: string }) => void

export type IOnDragCanvas = (input: { config?: IConfig, event: MouseEvent, data: DraggableData }) => void
export type IOnAddPort = (input: {config?: IConfig, properties: object, id: string }) => void

export type IOnTest = (nede?:string) =>void
export type IonAddOption = (option:object) =>void
export type IOnAddLinkProp = (input:{value:string, id : string})=>void
export type Ichangeconfig = ()=>void
export type IOnPortPositionChange = (input: { config?: IConfig, node: INode, port: IPort, el: HTMLDivElement, nodesEl: HTMLDivElement | IOffset }) => void
export type IonDeleteElement = (input:{id:string, type: string})=>void
export interface IOnLinkBaseEvent {
  config?: IConfig
  linkId: string,
  startEvent: React.MouseEvent,
  fromNodeId: string,
  fromPortId: string,
}

export type IOnchangeChart = (input: IChart)=>void
export type IOnLinkStart = (input: IOnLinkBaseEvent) => void

export interface IOnLinkMoveInput extends IOnLinkBaseEvent {
  toPosition: {
    x: number,
    y: number,
  }
}
export type IOnLinkMove = (input: IOnLinkMoveInput) => void

export type IOnLinkCancel = (input: IOnLinkBaseEvent) => void

export interface IOnLinkCompleteInput extends IOnLinkBaseEvent {
  toNodeId: string,
  toPortId: string
}
export type IOnLinkComplete = (input: IOnLinkCompleteInput) => void

export type IOnLinkMouseEnter = (input: { config?: IConfig, linkId: string }) => void

export type IOnLinkMouseLeave = (input: { config?: IConfig, linkId: string }) => void

export type IOnLinkClick = (input: { config?: IConfig, linkId: string }) => void

export type IOnCanvasClick = (input: { config?: IConfig }) => void

export type IOnDeleteKey = (input: { config?: IConfig }) => void

export type IOnNodeClick = (input: { config?: IConfig, nodeId: string }) => void

export type IOnNodeSizeChange = (input: { config?: IConfig, nodeId: string, size: ISize }) => void

export type IOnCanvasDrop = (input: { config?: IConfig, data: any, position: IPosition }) => void
