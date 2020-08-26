import * as React from 'react'
import {
  CanvasInnerDefault, CanvasOuterDefault, CanvasWrapper, ICanvasInnerDefaultProps, ICanvasOuterDefaultProps, IChart, IConfig, ILink,
  ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnDragCanvas,
  IOnDragNode, IOnLinkCancel, IOnLinkClick, IOnLinkComplete, IOnLinkMouseEnter,
  IOnLinkMouseLeave, IOnLinkMove, IOnLinkStart, IOnNodeClick, IOnNodeSizeChange, IOnPortPositionChange, IPortDefaultProps,
  IPortsDefaultProps, ISelectedOrHovered, LinkDefault, LinkWrapper, NodeDefault, NodeInnerDefault, NodeWrapper, PortDefault, PortsDefault, 
  IOnAddPort, IOnAddLinkProp, IonDeleteElement//Ichangeconfig,
} from '../../'

export interface IFlowChartCallbacks {
  onDragNode: IOnDragNode
  onDragCanvas: IOnDragCanvas
  onCanvasDrop: IOnCanvasDrop
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkComplete: IOnLinkComplete
  onLinkCancel: IOnLinkCancel
  onPortPositionChange: IOnPortPositionChange
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  onCanvasClick: IOnCanvasClick
  onDeleteKey: IOnDeleteKey
  onNodeClick: IOnNodeClick
  onNodeSizeChange: IOnNodeSizeChange
  onEditProperties: IOnAddPort
  onAddLinkeValue: IOnAddLinkProp
  onDeleteElement: IonDeleteElement
}

export interface IFlowChartComponents {
  CanvasOuter?: React.FunctionComponent<ICanvasOuterDefaultProps>
  CanvasInner?: React.FunctionComponent<ICanvasInnerDefaultProps>
  NodeInner?: React.FunctionComponent<INodeInnerDefaultProps>
  Ports?: React.FunctionComponent<IPortsDefaultProps>
  Port?: React.FunctionComponent<IPortDefaultProps>
  Node?: React.FunctionComponent<INodeDefaultProps>
  Link?: React.FunctionComponent<ILinkDefaultProps>
}

export interface IFlowChartProps {
  /**
   * The current chart state
   */
  chart: IChart
  /**
   * Callbacks for updating chart state.
   * See container/actions.ts for example state mutations
   */
  callbacks: IFlowChartCallbacks
  /**
   * Custom components
   */
  Components?: IFlowChartComponents
  /**
   * Other config. This will be passed into all components and actions.
   * Don't store state here as it may trigger re-renders
   */
  config?: IConfig

  // changeconfig: Ichangeconfig
  
}

export const FlowChart = (props: IFlowChartProps) => {
  const [ canvasSize, setCanvasSize ] = React.useState<{ width: number, height: number }>({ width: 0, height: 0 })

  const {
    chart,
    callbacks: {
      onDragNode,
      onDragCanvas,
      onCanvasDrop,
      onLinkStart,
      onLinkMove,
      onLinkComplete,
      onLinkCancel,
      onPortPositionChange,
      onLinkMouseEnter,
      onLinkMouseLeave,
      onLinkClick,
      onCanvasClick,
      onDeleteKey,
      onNodeClick,
      onNodeSizeChange,
      onEditProperties,
      onAddLinkeValue,
      onDeleteElement,
    },
    Components: {
      CanvasOuter = CanvasOuterDefault,
      CanvasInner = CanvasInnerDefault,
      NodeInner = NodeInnerDefault,
      Ports = PortsDefault,
      Port = PortDefault,
      Node = NodeDefault,
      Link = LinkDefault,
    } = {},
    config = {},
    // changeconfig,
  } = props
  const { links, nodes, selected, hovered, offset } = chart

  const canvasCallbacks = { onDragCanvas, onCanvasClick, onDeleteKey, onCanvasDrop }
  const linkCallbacks = { onLinkMouseEnter, onLinkMouseLeave, onLinkClick, onAddLinkeValue, onDeleteElement }
  const nodeCallbacks = { onDragNode, onNodeClick, onNodeSizeChange, onEditProperties, onDeleteElement }
  const portCallbacks = { onPortPositionChange, onLinkStart, onLinkMove, onLinkComplete, onLinkCancel }

  const nodesInView = Object.keys(nodes).filter((nodeId) => {
    // TODO: define this in chart?
    const defaultNodeSize = { width: 500, height: 500 }

    const { x, y } = nodes[nodeId].position
    const size = nodes[nodeId].size || defaultNodeSize

    return x + offset.x + size.width > 0 && x + offset.x < canvasSize.width &&
      y + offset.y + size.height > 0 && y + offset.y < canvasSize.height
  })

  const linksInView = Object.keys(links).filter((linkId) => {
    const from = links[linkId].from
    const to = links[linkId].to

    return (
      !to.nodeId ||
      nodesInView.indexOf(from.nodeId) !== -1 ||
      nodesInView.indexOf(to.nodeId) !== -1
    )
  })
  const [isopen, setisopen] = React.useState(false);
 
  return (
    <CanvasWrapper
      config={{...config, readonly:isopen}}
      position={chart.offset}
      ComponentInner={CanvasInner}
      ComponentOuter={CanvasOuter}
      onSizeChange={(width, height) => setCanvasSize({ width, height })}
      {...canvasCallbacks}
    >
      { linksInView.map((linkId) => {
        const isSelected = !config.readonly && selected.type === 'link' && selected.id === linkId
        const isHovered = !config.readonly && hovered.type === 'link' && hovered.id === linkId
        const fromNodeId = links[linkId].from.nodeId
        const toNodeId = links[linkId].to.nodeId

        return (
          <LinkWrapper
            config={{...config, readonly:isopen}}
            key={linkId}
            link={links[linkId]}
            links = {links}
            Component={Link}
            isSelected={isSelected}
            isHovered={isHovered}
            fromNode={nodes[fromNodeId]}
            toNode={toNodeId ? nodes[toNodeId] : undefined}
            {...linkCallbacks}
          />
        )
      })}
      { nodesInView.map((nodeId) => {
        const isSelected = selected.type === 'node' && selected.id === nodeId
        const selectedLink = getSelectedLinkForNode(selected, nodeId, links)
        const hoveredLink = getSelectedLinkForNode(hovered, nodeId, links)

        return (
          <NodeWrapper
            config={{...config, readonly:isopen}}
            key={nodeId}
            Component={Node}
            node={nodes[nodeId]}
            offset={chart.offset}
            isSelected={isSelected}
            selected={selectedLink ? selected : undefined}
            hovered={hoveredLink ? hovered : undefined}
            selectedLink={selectedLink}
            hoveredLink={hoveredLink}
            NodeInner={NodeInner}
            Ports={Ports}
            Port={Port}
            {...nodeCallbacks}
            {...portCallbacks}
            changeconfig= {()=>setisopen(!isopen)}
          />
        )
      })
    }
    </CanvasWrapper>
  )
}

const getSelectedLinkForNode = (
  selected: ISelectedOrHovered,
  nodeId: string,
  links: IChart['links'],
): ILink | undefined => {
  const link = selected.type === 'link' && selected.id ? links[selected.id] : undefined

  if (link && (link.from.nodeId === nodeId || link.to.nodeId === nodeId)) {
    return link
  }

  return undefined
}


// export default Test;
interface test {
  per:string
}

export const Test1=(props:test) => {
  return (
      <div>
          <p>{props.per}</p>
      </div>
  )
}