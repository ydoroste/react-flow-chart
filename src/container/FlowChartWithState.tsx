import * as React from 'react'
import { FlowChart, IChart, IConfig, IFlowChartComponents, IOnchangeChart } from '../'
import * as actions from './actions'
import mapValues from './utils/mapValues'
import Button from '@material-ui/core/Button';
// var deepEqual = require('deep-equal')
export interface IFlowChartWithStateProps {
  initialValue: IChart
  Components?: IFlowChartComponents
  config?: IConfig
  onChangeChart ?: IOnchangeChart

}

/**
 * Flow Chart With State
 */
export class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
  public state: IChart
  private stateActions = mapValues(actions, (func: any) =>
      (...args: any) => this.setState(func(...args)))

  constructor (props: IFlowChartWithStateProps) {
    super(props)
    this.state = this.getStateFromProps(props)
    // if (props.onChangeChart && !deepEqual(this.state, props.initialValue)){
    //   console.log('deeeppp')
    //   props.onChangeChart(this.state)
    // }
  }
  // componentDidUpdate(prevProps: IFlowChartWithStateProps, prevState: object){
  //   console.log('update')
  //   console.log(this.state)
  //   console.log(prevProps.initialValue)
  //   if (this.props.onChangeChart && !deepEqual(this.state, prevProps.initialValue)){
  //     console.log('deeeppp')
  //     this.props.onChangeChart(this.state)
  //   }
  // }
  getStateFromProps(props:IFlowChartWithStateProps){
    const {initialValue} = props
    return ({...initialValue})
  }
  
  public render() {
    // const [isopen, setisopen] = React.useState(false);
    const {Components, config} = this.props
    // console.log('chart rendered')
    // onChangeChart&& onChangeChart(this.state)
    // console.log(this.state)
    return (
      <div className='form-builder'>
          <Button variant="contained" onClick={()=> this.props.onChangeChart && this.props.onChangeChart(this.state)} className="referesh-from">پیش نمایش فرم</Button>
          <FlowChart
          chart={this.state}
          callbacks={this.stateActions}
          Components={Components}
          config={config}
          // changeconfig={()=>setisopen}
        />
      </div>
        
    )
  }
}
