import * as React from 'react'
import styled from 'styled-components'
import { IConfig, INode } from '../../'

export interface INodeInnerDefaultProps {
  config: IConfig
  node: INode
}

const Outer = styled.div`
  padding: 40px 30px;
`

export const NodeInnerDefault = ({ node }: INodeInnerDefaultProps) => {
  // console.log(node)
  return (
    <Outer>
      <div className='d-flex justify-content-center align-items-center' >{node.properties? node.properties.display.label: node.type}</div>
    </Outer>
  )
}
