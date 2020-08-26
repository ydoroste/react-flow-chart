import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export type IonChange = (value:unknown)=>void

interface Inputoption {
    value?: string
    onChange : IonChange,
}
export default function NativeSelects(props: Inputoption) {
  const classes = useStyles();
  const {value, onChange} = props

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    onChange(event.target.value)
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">قبول</InputLabel>
        <Select
          native
          value={value}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'filled-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"image"}>تصویر</option>
          <option value={'video'}>فیلم</option>
          <option value={'file'}>فایل</option>
          <option value={'all'}>همه</option>
        </Select>
      </FormControl>
    </div>
  );
}