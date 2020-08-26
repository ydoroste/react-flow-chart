import { INode, IPosition } from '../../../'
const ports= {
  position:{
    x:0,
    y:0
  },
  id: 'port1',
  type: 'input',
}
export const getLinkPosition = (node: INode, portId: string): IPosition => {
  const port = node.ports ?node.ports[portId] : ports
  return {
    x: node.position.x + (port.position ? port.position.x : 0),
    y: node.position.y + (port.position ? port.position.y : 0),
  }
}
