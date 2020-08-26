import * as React from 'react'
// import { Editor } from 'react-draft-wysiwyg';
import DynamicOptionList from './dynamic-option-list';
import {
    EditorState, convertFromHTML, ContentState, convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Forminput from './component/forminput'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Idisplay } from '../../'
import { IonEditOptionText, IonRemoveOption, IonChangeDisplayOptions } from './types/function'
import SelectFileType from './component/filetypeselect'
type option = {
    key: string,
    text?: string,
    value?: string
}



interface Property {
    display?: Idisplay
    onChangeDisplayOptions: IonChangeDisplayOptions
}
type mystate = {
    display: any
}
export default class EditForm extends React.Component<Property, mystate> {
    constructor(props: Property) {
        super(props);
        this.state = {
            display: props.display
        }

    }
    onAddOption = (option: object) => {
        const form = this.state.display
        this.setState({
            display: {
                ...form,
                options: [...form.options, option]
            }
        })
        this.props.onChangeDisplayOptions({
            ...form,
            options: [...form.options, option]
        })
    }
    onRemoveOption: IonRemoveOption = ({ id }) => {
        const form = this.state.display
        const options = form.options
        const noptions = options.filter((option: option) => { return option.key !== id })
        this.setState({
            display: {
                ...form,
                options: noptions
            }
        })
        this.props.onChangeDisplayOptions({
            ...form,
            options: noptions
        })
    }
    onEditOptionText: IonEditOptionText = ({ id, text, prop }) => {
        // console.log(text)
        const form = this.state.display
        const noption = this.state.display.options.map((option: option)=>{
            if (option.key == id){
                option[prop] = text
                return option
                
            }else{
                return option
            }
        })
        this.setState({
            display: {
                ...form,
                options: noption
            }
        })
        this.props.onChangeDisplayOptions({
            ...form,
            options: noption
        })
    }
    hasOwnProperty = (item: string) => {
        if (this.props.display && this.props.display[item] == undefined) {
            return (false)
        } else {
            return true
        }
    }

    convertFromHTML(content: string) {
        const newContent = convertFromHTML(content);
        if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
            // to prevent crash when no contents in editor
            return EditorState.createEmpty();
        }
        // console.log(content)
        // return

        const contentState = ContentState.createFromBlockArray(newContent.contentBlocks);
        return EditorState.createWithContent(contentState);
    }

    setRequired = () => {
        this.setState({ display: { ...this.state.display, required: !this.state.display.required } })
        this.props.onChangeDisplayOptions({
            ...this.state.display, required: !this.state.display.required
        })
    }

    onEditorStateChange(property: string, editorContent: any) {
        console.log(property)
        // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
        const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/(?:\r\n|\r|\n)/g, ' ');
        const this_element = this.state.display;
        this_element[property] = html;
        this.setState({
            display: this_element,

        });
        this.props.onChangeDisplayOptions(this_element)
    }
    editElementProp(elemProperty: any, targetProperty: any, event: any) {
        // elemProperty could be content or label
        // targProperty could be value or checked
        const this_element = this.state.display;
        this_element[elemProperty] = event.target[targetProperty];

        this.setState({
            display: this_element
        });
        this.props.onChangeDisplayOptions(this_element)
    }

    onChangeFileType = (accept: any)=>{
        const this_element = this.state.display;
        this_element['accept'] = accept;

        this.setState({
            display: this_element
        });
        this.props.onChangeDisplayOptions(this_element)
    }

    render() {
        
        return (
            <div className="p-2 ">

                {this.hasOwnProperty('label') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='label' value={this.state.display.label} label='Label' />
                }
                {this.hasOwnProperty('placeholder') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='placeholder' value={this.state.display.placeholder} label='Placeholder' />
                }
                {this.hasOwnProperty('description') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='description' value={this.state.display.description} label='Description' />
                }
                {this.hasOwnProperty('type') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='type' value={this.state.display.type} label='Type' />
                }
                {this.hasOwnProperty('errormessage') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='errormessage' value={this.state.display.errormessage} label='Error Message' />
                }
                {this.hasOwnProperty('class') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='class' value={this.state.display.class} label='Class Style' />
                }
                {this.hasOwnProperty('accept') &&
                    <SelectFileType value = {this.state.display.accept} onChange = {(accept)=> this.onChangeFileType(accept)}/>
                }
                {this.hasOwnProperty('disabled') &&
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.display.disabled}
                                onChange={this.editElementProp.bind(this, 'disabled', 'checked')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                        label='disabled' />
                }



                {this.hasOwnProperty("options") &&
                    <DynamicOptionList
                        options={this.state.display.options}
                        canHaveOptionCorrect={true}
                        canHaveOptionValue={true}
                        onAddOption={this.onAddOption}
                        onEditOptionText={this.onEditOptionText}
                        onRemoveOption={this.onRemoveOption}
                    />
                }
            </div>
        )
    }
}