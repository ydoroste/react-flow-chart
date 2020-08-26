import * as React from 'react'
import {
    EditorState, convertFromHTML, ContentState, convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Forminput from './component/forminput'
import { Ivalidation } from '../../'
import { IonChangeValidationOptions } from './types/function'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



interface Property {
    validation?: Ivalidation
    onChangeValidationOptions: IonChangeValidationOptions
}
type mystate = {
    validation: any
}
export default class EditForm extends React.Component<Property, mystate> {
    constructor(props: Property) {
        super(props);
        this.state = {
            validation: props.validation
        }

    }

    hasOwnProperty = (item: string) => {
        if (this.props.validation && this.props.validation[item] == undefined) {
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
        this.setState({ validation: { ...this.state.validation, required: !this.state.validation.required } })
        this.props.onChangeValidationOptions({
            ...this.state.validation, required: !this.state.validation.required
        })
    }

    onEditorStateChange(property: string, editorContent: any) {
        console.log(property)
        // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
        const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/(?:\r\n|\r|\n)/g, ' ');
        const this_element = this.state.validation;
        this_element[property] = html;
        this.setState({
            validation: this_element,

        });
        this.props.onChangeValidationOptions(this_element)
    }
    editElementProp(elemProperty: any, targetProperty: any, event: any) {
        // elemProperty could be content or label
        // targProperty could be value or checked
        const this_element = this.state.validation;
        this_element[elemProperty] = event.target[targetProperty];

        this.setState({
            validation: this_element
        });
        this.props.onChangeValidationOptions(this_element)
    }

    render() {
        return (
            <div className="p-2 ">

                {this.hasOwnProperty('required') &&
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.validation.required}
                                onChange={this.editElementProp.bind(this, 'required', 'checked')}
                                inputProps={{ 'aria-label': 'primary checkbox' }} 
                            />}
                        label='required' />
                }
                <br/>
                {this.hasOwnProperty('unique') &&
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.validation.unique}
                                onChange={this.editElementProp.bind(this, 'unique', 'checked')}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                        label='unique' />
                }

                {this.hasOwnProperty('minLength') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='minLength' value={this.state.validation.minLength} type='number' label="Minimum Length"/>
                }
                {this.hasOwnProperty('maxLength') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='maxLength' value={this.state.validation.maxLength} type='number' label="Maximum Length"/>
                }
                {this.hasOwnProperty('regex') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='regex' value={this.state.validation.regex} type='text' label="Regex"/>
                }
                {this.hasOwnProperty('regex') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='regexErrorMessage' value={this.state.validation.regexErrorMessage || ""} type='text' label="Regex Error Message"/>
                }
            </div>
        )
    }
}