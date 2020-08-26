import * as React from 'react'
import { FlowChartWithState, IOnchangeChart, IChart } from '../src'
import { Page } from './components'
import { chartSimple } from './misc/exampleChartState'
export const onChangeChar: IOnchangeChart =(input: IChart) => {
  console.log(input)
}
// export const ConfigSnapToGridDemo = () => {
//   return (
//     <Page>
//       <FlowChartWithState
//         initialValue={chartSimple}
//         config={{
//           snapToGrid: true,
//         }}
//         onChangeChart={onChangeChart}
//       />
//     </Page>
//   )
// }
export interface ICanvasWrapperProps {
  onChangeChart: IOnchangeChart
}
export class  ConfigSnapToGridDemo extends React.Component<ICanvasWrapperProps> {
  public render(){
    return(
      <Page>
      <FlowChartWithState
        initialValue={chartSimple}
        config={{
          snapToGrid: true,
        }}
        onChangeChart={(x: IChart)=>onChangeChar(x)}
      />
    </Page>
    )
  }
}

