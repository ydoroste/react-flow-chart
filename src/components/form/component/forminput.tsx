import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '100%',
        backgroundColor:'white',
      },
    },
  }),
);

export type IonChange = (elemProperty: string, targetProperty: string, event: any)=>void

interface Inputoption {
    elemProperty: string,
    targetProperty: string,
    value?: string
    onChange : IonChange,
    type?: string
    label: string
}

export default function BasicTextFields(props: Inputoption) {
    const {elemProperty, targetProperty, onChange, value, type, label} = props
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <TextField label={label} value={value} variant="outlined" onChange={(event: any)=> onChange(elemProperty, targetProperty, event) } type={type}/>
    </form>
  );
}