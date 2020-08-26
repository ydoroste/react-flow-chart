import { Idisplay, Ivalidation, Idata} from '../../../'
export type IonEditOptionText = (input:{id: string, text: string, prop:string})=>void
export type IonRemoveOption = (input:{id:string})=>void
export type IonClose = ()=>void
export type IonChangeDisplayOptions = (input:Idisplay)=>void
export type IonChangeValidationOptions = (input:Ivalidation)=>void
export type IonChangeDataOptions = (input:Idata)=>void