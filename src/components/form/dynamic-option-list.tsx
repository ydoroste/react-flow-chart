import * as React from 'react'
import { IonAddOption } from '../../'
import ID from './UUID';
import { IonEditOptionText, IonRemoveOption } from './types/function'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { green, red } from '@material-ui/core/colors';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
// const shortid = require('shortid');

type option = {
    key: string,
    text?: string,
    value?: string
}

export interface OptionsProp {
    options: Array<option>
    canHaveOptionValue: boolean
    canHaveOptionCorrect: boolean
    onAddOption: IonAddOption
    onEditOptionText: IonEditOptionText
    onRemoveOption: IonRemoveOption

}


export default class DynamicOptionList extends React.Component<OptionsProp>{
    _setValue(text: string) {
        return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
    addOption() {
        this.props.onAddOption({ value: '', text: 'option', key: ID.uuid() })
    }



    // editText = (id: string, text: string)=>{
    //     this.props.onEditOptionText(id, text)
    // }
    public render() {

        // console.log(this.props.options)
        return (
            <div className="dynamic-option-list">
                <Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={6}>
                            <b>برچسب</b>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <b>مقدار</b>
                        </Grid>
                    </Grid>
                    {
                        this.props.options.map((option, index) => {
                            const val = option.value;
                            return (
                                <Grid container spacing={0} style={{padding:10}} key = {option.key}>
                                    <Grid item xs={6} sm={6}>
                                        <TextField  size='small' value={option.text} variant="outlined" onChange={(event) => { this.props.onEditOptionText({ id: option.key, text: event.target.value, prop: 'text' }) }} />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField  size='small' value={val} variant="outlined"  onChange={(event) => { this.props.onEditOptionText({ id: option.key, text: event.target.value, prop: 'value' }) }}/>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <div className="dynamic-options-actions-buttons">
                                            <IconButton aria-label="delete" onClick={this.addOption.bind(this)}>
                                                <AddCircleIcon style={{ color: green[500] }}  />
                                            </IconButton>
                                            {index > 0 &&
                                                < IconButton aria-label="delete" onClick={() => { this.props.onRemoveOption({ id: option.key }) }} >
                                                    <RemoveCircleIcon style={{ color: red[500] }} />
                                                </IconButton>
                                                //  <button className="btn btn-danger p-0" onClick={() => { this.props.onRemoveOption({ id: option.key }) }}><IoIosRemove size='1.5em' /></button>
                                            }
                                        </div>
                                    </Grid>

                                </Grid>
                            )
                        })

                    }

                </Paper>

                {/* <ul>
                    <li>
                        <div className="row">
                            <div className="col-sm-6"><b>Options</b></div>
                            {this.props.canHaveOptionValue &&
                                <div className="col-sm-2"><b>Value</b></div>}
                            {this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
                                <div className="col-sm-4"><b>Correct</b></div>}
                        </div>
                    </li>
                    {
                        this.props.options.map((option, index) => {
                            const this_key = `edit_${option.key}`;
                            const val = option.value;
                            return (
                                <li className="clearfix" key={this_key}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input tabIndex={index + 1} className="form-control" style={{ width: '100%' }} type="text" name={`text_${index}`} placeholder="Option text"
                                                value={option.text} onChange={(event) => { this.props.onEditOptionText({ id: option.key, text: event.target.value }) }} />
                                        </div>
                                        {this.props.canHaveOptionValue &&
                                            <div className="col-sm-2">
                                                <input className="form-control" type="text" name={`value_${index}`} value={val} />
                                            </div>}
                                        {this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
                                            <div className="col-sm-1">
                                                <input className="form-control" type="checkbox" value="1" />
                                            </div>}
                                        <div className="col-sm-3">
                                            <div className="dynamic-options-actions-buttons">
                                                <button onClick={this.addOption.bind(this)} className="btn btn-success p-0 mr-1"><IoIosAdd size='1.5em' /></button>
                                                {index > 0
                                                    && <button className="btn btn-danger p-0" onClick={() => { this.props.onRemoveOption({ id: option.key }) }}><IoIosRemove size='1.5em' /></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul> */}
            </div >
        )
    }
}