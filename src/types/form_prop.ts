
export type option={
    key?:string,
    text?: string,
    value?: string
}

export type file = {
    id:string,
    file_name:string
}

export type Idisplay = {
    label: string
    placeholder?: string
    descriotion?: string
    options?: option
    disabled?: boolean
    errormessage: string
    class?: string
    type?: string
    accept: 'string'
}

export type Idata = {
    defaultValue?:string
}

export type Ivalidation = {
    required?: boolean
    unique?: boolean
    minimumlength?: number
    maximumlength?: number
}
export type formOption = {
    display?:Idisplay
    data?: Idata
    validation?: Ivalidation
    id: string
    element?: string
    text?: string
    static?: undefined
    required?: boolean
    canHaveAnswer?: boolean
    canHavePageBreakBefore?: boolean
    canHaveAlternateForm?: boolean
    canHaveDisplayHorizontal?: boolean
    canHaveOptionCorrect?: boolean
    canHaveOptionValue?: boolean
    field_name?: string
    label?: string
    options: Array<option>
    file_path:Array<file>
    href: string
    src:string
    step:string
    min_value:string
    min_label:string
    max_value:string
    max_label:string
    default_value:string
    content?: string
    center?:boolean
    width?: number
    height?: number
    readOnly?: boolean
    defaultToday?: boolean
    showTimeSelect?: boolean
    showTimeSelectOnly?:boolean
    inline?:boolean
    bold?:boolean
    italic?: boolean
    pageBreakBefore?:boolean
    alternateForm?:boolean
    variableKey?: string
    placeholder?: string
    description?: string
}
