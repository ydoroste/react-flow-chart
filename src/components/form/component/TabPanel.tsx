import * as React from 'react'
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
interface proptype {
    children: any,
    index: number,
    value: number
}

export const TabPanel = (props: proptype)=> {
    const { value, index, children } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && children}
      </div>
    );
  }