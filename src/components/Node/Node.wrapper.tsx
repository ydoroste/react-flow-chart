import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Draggable, { DraggableData } from 'react-draggable'
import ResizeObserver from 'react-resize-observer'
import {
  IConfig, ILink, INode, INodeInnerDefaultProps, IOnDragNode,
  IOnLinkCancel, IOnLinkComplete, IOnLinkMove, IOnLinkStart,
  IOnNodeClick, IOnNodeSizeChange, IOnPortPositionChange,
  IPortDefaultProps, IPortsDefaultProps, IPosition, ISelectedOrHovered, ISize, PortWrapper, IOnAddPort, Ichangeconfig, IonDeleteElement
} from '../../'
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { noop } from '../../utils'
import { INodeDefaultProps, NodeDefault } from './Node.default'
import { green } from '@material-ui/core/colors';
import FormElementEdit from '../form/form-element-edit'
import Modal from './modal'

const ports = {
  id: 'port1',
  type: 'input',
}

export interface INodeWrapperProps {
  config: IConfig
  node: INode
  Component: React.FunctionComponent<INodeDefaultProps>
  offset: IPosition
  selected: ISelectedOrHovered | undefined
  hovered: ISelectedOrHovered | undefined
  selectedLink: ILink | undefined
  hoveredLink: ILink | undefined
  isSelected: boolean
  NodeInner: React.FunctionComponent<INodeInnerDefaultProps>
  Ports: React.FunctionComponent<IPortsDefaultProps>
  Port: React.FunctionComponent<IPortDefaultProps>
  onPortPositionChange: IOnPortPositionChange
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkComplete: IOnLinkComplete
  onLinkCancel: IOnLinkCancel
  onDragNode: IOnDragNode
  onNodeClick: IOnNodeClick
  onNodeSizeChange: IOnNodeSizeChange
  onEditProperties: IOnAddPort
  changeconfig: Ichangeconfig
  onDeleteElement: IonDeleteElement
}

export const NodeWrapper = ({
  config,
  node,
  onDragNode,
  onNodeClick,
  isSelected,
  Component = NodeDefault,
  onNodeSizeChange,
  NodeInner,
  Ports,
  Port,
  offset,
  selected,
  selectedLink,
  hovered,
  hoveredLink,
  onPortPositionChange,
  onLinkStart,
  onLinkMove,
  onLinkComplete,
  onLinkCancel,
  onEditProperties,
  changeconfig,
  onDeleteElement
}: INodeWrapperProps) => {
  const [size, setSize] = React.useState<ISize>({ width: 0, height: 0 })

  const isDragging = React.useRef(false)

  const onStart = React.useCallback((e: MouseEvent) => {
    // Stop propagation so the canvas does not move
    e.stopPropagation()
    isDragging.current = false
  }, [])

  const onDrag = React.useCallback((event: MouseEvent, data: DraggableData) => {
    isDragging.current = true
    onDragNode({ config, event, data, id: node.id })
  }, [onDragNode, config, node.id])

  const onClick = React.useCallback((e: React.MouseEvent) => {
    if (!config.readonly) {
      e.stopPropagation()
      if (!isDragging.current) {
        // onNodeClick({ config, nodeId: node.id })
        return
      }
    }
  }, [config, node.id])

  const compRef = React.useRef<HTMLElement>(null)

  // TODO: probably should add an observer to track node component size changes
  React.useLayoutEffect(() => {
    const el = ReactDOM.findDOMNode(compRef.current) as HTMLInputElement
    if (el) {
      if (
        (node.size && node.size.width) !== el.offsetWidth ||
        (node.size && node.size.height) !== el.offsetHeight
      ) {
        const newSize = { width: el.offsetWidth, height: el.offsetHeight }
        setSize(newSize)
        onNodeSizeChange({ config, nodeId: node.id, size: newSize })
      }
    }
  }, [node, compRef.current, size.width, size.height])
  const [isopen, setisopen] = React.useState(false);
  const handleClose = () => {
    setisopen(false);
    changeconfig()
  }
  const children = (
    <>
      <div className='d-flex justify-content-between bg-light'>
        <IconButton aria-label="delete" onClick={() => { changeconfig(); setisopen(!isopen) }} style={{ color: green[500] }}>
          <SettingsIcon  />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDeleteElement({ id: node.id, type: 'node' })}>
          <DeleteForeverIcon  color="secondary" />
        </IconButton>
      </div>
      <Modal
        setClose={handleClose}
        isopen={isopen}
      >
        <FormElementEdit element={node.properties} onEditProperties={onEditProperties} id={node.id} onClose={() => {setisopen(false);changeconfig() }} />
      </Modal>
      <ResizeObserver
        onResize={(rect) => {
          const newSize = { width: rect.width, height: rect.height }
          setSize(newSize)
        }}
      />
      <NodeInner node={node} config={config} />
      {
        node.ports &&
        <Ports config={config}>
          {Object.keys(node.ports).map((portId) => (
            <PortWrapper
              config={config}
              key={portId}
              offset={offset}
              selected={selected}
              selectedLink={selectedLink}
              hoveredLink={hoveredLink}
              hovered={hovered}
              node={node}
              port={node.ports ? node.ports[portId] : ports}
              Component={Port}
              onPortPositionChange={onPortPositionChange}
              onLinkStart={config.readonly ? noop : onLinkStart}
              onLinkMove={config.readonly ? noop : onLinkMove}
              onLinkComplete={onLinkComplete}
              onLinkCancel={onLinkCancel}
            />
          ))}
        </Ports>
      }

    </>
  )

  return (

    <Draggable
      bounds="parent"
      axis="both"
      position={node.position}
      grid={[1, 1]}
      onStart={onStart}
      onDrag={onDrag}
      disabled={isopen}//config.readonly
    >
      <Component
        config={config}
        ref={compRef}
        children={children}
        onClick={onClick}
        isSelected={isSelected}
        node={node}
      />
    </Draggable>

  )
}
