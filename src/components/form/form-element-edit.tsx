import * as React from 'react'
// import { Editor } from 'react-draft-wysiwyg';
import { Button } from 'reactstrap';
// import { IoIosClose } from 'react-icons/io'
import DisplayOptions from './display'
// import { IonAddOption } from 'types';
import { formOption, IonAddOption, Idisplay, Ivalidation, Idata } from '../../'
import { IonClose } from './types/function'
// import { Nav, NavItem, NavLink } from 'reactstrap';
import {
    // AppBar,
    Tabs,
    Tab,
} from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import { TabPanel } from './component/TabPanel'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Validation from './validation'
import Data from './data'
function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

interface Property {
    element: formOption
    onEditProperties: IonAddOption
    onClose: IonClose
    id: string
}
type mystate = {
    formprop: formOption
    active_tab: number
}
export default class EditForm extends React.Component<Property, mystate> {
    constructor(props: Property) {
        super(props);
        this.state = {
            formprop: props.element,
            active_tab: 0
        }
    }
    onChangeDisplayOptions = (display: Idisplay) => {
        this.setState({ formprop: { ...this.state.formprop, display } })
    }

    onChangeValidationOptions = (validation: Ivalidation) => {
        this.setState({ formprop: { ...this.state.formprop, validation } })
    }
    onChangedataOptions = (data: Idata) => {
        this.setState({ formprop: { ...this.state.formprop, data } })
    }
    hasOwnProperty = (item: string) => {
        if (this.props.element && this.props.element[item] == undefined) {
            return (false)
        } else {
            return true
        }
    }
    render() {
        const { formprop } = this.state
        return (
            <div className="p-2 bg-white rounded">
                {/* <button onClick={this.props.onClose} className='position-absolute btn-danger p-0' style={{ top: 1, right: 1 }}><IoIosClose size='2em' /></button> */}
                <IconButton className='position-absolute' style={{ top: 1, right: 10 }} aria-label="delete" onClick={this.props.onClose}>
                    <CloseIcon  />
                </IconButton>


                <div className="clearfix" >
                    <h4 className="pull-left">{this.props.element['text']}</h4>
                    <i className="pull-right fa fa-times dismiss-edit" ></i>
                </div>
                <div className="bg-light rounded">
                    <Paper square>
                        <Tabs
                            value={this.state.active_tab}
                            onChange={(event, value: number) => this.setState({ active_tab: value })}
                            aria-label="simple tabs example"
                            indicatorColor="primary"
                            textColor="primary"
                            // style={{backgroundColor: 'red'}}
                            className='bg-light'
                        >
                            <Tab label="نمایش"  {...a11yProps(0)} />
                            {
                                this.hasOwnProperty('validation') &&
                                <Tab label="ارزیابی"  {...a11yProps(1)} />
                            }
                           {
                               this.hasOwnProperty('data') &&
                               <Tab label="داده ها"  {...a11yProps(2)} />
                           }
                            
                        </Tabs>
                    </Paper>
                    <TabPanel value={this.state.active_tab} index={0}>
                        <DisplayOptions
                            display={formprop.display}
                            onChangeDisplayOptions={this.onChangeDisplayOptions}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.active_tab} index={1}>
                        <Validation 
                            validation={formprop.validation} 
                            onChangeValidationOptions={this.onChangeValidationOptions}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.active_tab} index={2}>
                        <Data 
                            data={formprop.data} 
                            onChangedataOptions = {this.onChangedataOptions}
                        />
                    </TabPanel>
                </div>

                {/* <Nav tabs>
                    <NavItem>
                        <NavLink onClick={() => this.setState({ active_tab: 'display' })} active={this.state.active_tab == 'display'}>display</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => this.setState({ active_tab: 'validation' })} active={this.state.active_tab == 'validation'}>valida</NavLink>
                    </NavItem>
                </Nav> */}



                <Button color="primary" onClick={() => { this.props.onEditProperties({ properties: formprop, id: this.props.id }); this.props.onClose() }}>ذخیره</Button>
            </div>
        )
    }
}