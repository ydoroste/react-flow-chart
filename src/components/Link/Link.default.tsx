import * as React from 'react'
import { generateCurvePath, IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPosition } from '../../'

export interface ILinkDefaultProps {
  config: IConfig
  link: ILink
  startPos: IPosition
  endPos: IPosition
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
}

export const LinkDefault = ({
  config,
  link,
  startPos,
  endPos,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isHovered,
  isSelected,
}: ILinkDefaultProps) => {
  const points = generateCurvePath(startPos, endPos)

  return (
    <div>
      
      <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
      <button>sdfsf</button>
        <circle
          r="4"
          cx={startPos.x}
          cy={startPos.y}
          fill="cornflowerblue"
        />
        {/* Main line */}
        <path
          d={points}
          stroke="cornflowerblue"
          strokeWidth="3"
          fill="none"
        />
        {/* Thick line to make selection easier */}
        <path
          d={points}
          stroke="cornflowerblue"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
          onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
          onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
          onClick={(e) => {
            onLinkClick({ config, linkId: link.id })
            e.stopPropagation()
          }}
        />
        {/* <polygon
          points={`${25 + endPos.x},${6 + endPos.y} ${10 + endPos.x},${40 + endPos.y} ${40 + endPos.x},${40 + endPos.y}`}
          fill="cornflowerblue" /> */}
        <circle
        r="4"
        cx={endPos.x}
        cy={endPos.y}
        fill="cornflowerblue"
      />
      </svg>
    </div>

  )
}
//{`${25+endPos.x },${6+ endPos.y} ${10+ endPos.x},${40+ endPos.y} ${40+ endPos.x},${40+endPos.y}`}
///{`${25+50 },${6+ 50} ${10+ 50},${40+ 50} ${40+ 50},${40+50}`}