import * as React from 'react'
import { IConfig, ILink, INode, IChart, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IOnAddLinkProp, option, IonDeleteElement } from '../../'
import { noop } from '../../utils'
import { ILinkDefaultProps, LinkDefault } from './Link.default'
import { getLinkPosition } from './utils'
import styled from 'styled-components'
import { Button as MButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import {Button as BButton, } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import MyModal from '../Node/modal';
const shortid = require('shortid');

const Label = styled.div`
  position: absolute;
`

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;
  height: 15px;
  width: 15px;
  transform: translate(50%, -50%);
  background: pink;
  color: white;
  border-radius: 50%;
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
  }
`

export interface ILinkWrapperProps {
  config: IConfig,
  link: ILink
  isSelected: boolean
  isHovered: boolean
  fromNode: INode
  toNode: INode | undefined
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  Component?: React.FunctionComponent<ILinkDefaultProps>
  onAddLinkeValue: IOnAddLinkProp
  links : IChart['links']
  onDeleteElement: IonDeleteElement
}

export const LinkWrapper = React.memo(({
  config,
  Component = LinkDefault,
  link,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isSelected,
  isHovered,
  fromNode,
  toNode,
  onAddLinkeValue,
  links,
  onDeleteElement
}: ILinkWrapperProps) => {
  // console.log(link, fromNode, toNode)
  const startPos = getLinkPosition(fromNode, link.from.portId)

  const endPos = toNode && link.to.portId
    ? getLinkPosition(toNode, link.to.portId)
    : link.to.position

  // Don't render the link yet if there is no end pos
  // This will occur if the link was just created
  if (!endPos) {
    return null
  }
  const [isopen, setisopen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const [linkvalue, setlinkvalue] = React.useState(link.properties? link.properties : '')
  const centerX = startPos.x + (endPos.x - startPos.x) / 2
  const centerY = startPos.y + (endPos.y - startPos.y) / 2
  const options: Array<option> = fromNode.properties? fromNode.properties.display.options: undefined
  const closeMenue = () => {
    setAnchorEl(null);
  };
  const handleClose = () => setisopen(false)
  const isValueSelected = (value?: string)=>{
    let selected = false
    for (const key in links){
      if(key === link.id){
        selected = false
        return selected
      }
      if (links[key]["properties"] == value ){
        console.log('selected')
        selected = true
      }
    }
    return selected
  }
  const onSelect = (value?:string)=>{
    if (!isValueSelected(value)){
      setlinkvalue(value? value: '');
      closeMenue()
    }
  }
  return (
    <>
      <Component
        config={config}
        link={link}
        startPos={startPos}
        endPos={endPos}
        onLinkMouseEnter={config.readonly ? noop : onLinkMouseEnter}
        onLinkMouseLeave={config.readonly ? noop : onLinkMouseLeave}
        onLinkClick={config.readonly ? noop : onLinkClick}
        isSelected={isSelected}
        isHovered={isHovered}
      />
      <Label style={{ left: centerX, top: centerY }}>
        <Button onClick={() => setisopen(true)} >
          ...
        </Button>
      </Label>
      <MyModal
        setClose={handleClose}
        isopen={isopen} >
        <IconButton className='position-absolute' style={{ top: 1, right: 10 }} aria-label="delete" onClick={handleClose}>
          <CloseIcon  />
        </IconButton>
        <div className="d-flex flex-row p-3 m-3 align-items-center" >
          <b className='p-0 ml-2'>link value: </b>
          <>
            <MButton aria-controls="simple-menu" aria-haspopup="true" variant="contained" onClick={handleClick} style={{ color: green[500] }}>
              { linkvalue ? linkvalue : 'select ...'}
            </MButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenue}
            >
              { options &&
                options.map(option=>(
                  // <DropdownItem >{option.value}</DropdownItem>
                  <MenuItem onClick={()=>{onSelect(option.value)}} key = {shortid.generate()}>{option.value}</MenuItem>))
              }
              <MenuItem onClick={()=>{onSelect('noValue')}} key = {shortid.generate()}>No Value</MenuItem>
            </Menu>
          </>
        </div>
        <div className = 'd-flex justify-content-between'>
        <MButton variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />} onClick={()=>{onAddLinkeValue({value: linkvalue,id:link.id}); handleClose()}}>ذخیره</MButton>
        <MButton 
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />} onClick={()=>{onDeleteElement({ id: link.id, type: 'link' }); handleClose()}}>حذف</MButton>
        </div>
        
      </MyModal>
    </>
  )
})
