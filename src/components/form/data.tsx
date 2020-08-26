import * as React from 'react'
import {
    EditorState, convertFromHTML, ContentState, convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Forminput from './component/forminput'
import { Idata } from '../../'
import { IonChangeDataOptions } from './types/function'




interface Property {
    data?: Idata
    onChangedataOptions: IonChangeDataOptions
}
type mystate = {
    data: any
}
export default class EditForm extends React.Component<Property, mystate> {
    constructor(props: Property) {
        super(props);
        this.state = {
            data: props.data
        }

    }

    hasOwnProperty = (item: string) => {
        if (this.props.data && this.props.data[item] == undefined) {
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
        this.setState({ data: { ...this.state.data, required: !this.state.data.required } })
        this.props.onChangedataOptions({
            ...this.state.data, required: !this.state.data.required
        })
    }

    onEditorStateChange(property: string, editorContent: any) {
        console.log(property)
        // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
        const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/(?:\r\n|\r|\n)/g, ' ');
        const this_element = this.state.data;
        this_element[property] = html;
        this.setState({
            data: this_element,

        });
        this.props.onChangedataOptions(this_element)
    }
    editElementProp(elemProperty: any, targetProperty: any, event: any) {
        // elemProperty could be content or label
        // targProperty could be value or checked
        const this_element = this.state.data;
        this_element[elemProperty] = event.target[targetProperty];

        this.setState({
            data: this_element
        });
        this.props.onChangedataOptions(this_element)
    }

    render() {
        return (
            <div className="p-2 ">

                {this.hasOwnProperty('defaultValue') &&
                    <Forminput onChange={this.editElementProp.bind(this)} targetProperty='value' elemProperty='defaultValue' value={this.state.data.defaultValue} label='Default Value'/>
                }
 
            </div>
        )
    }
}