import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CheckedOutInformation(props) {
  const classes = useStyles();
  return (
    <div>
        <Typography variant = "h6">Staff Member:</Typography>
        <Typography variant = "body1">{props.item.lendInfo.staffMemberName}</Typography>
        <Divider className = {classes.divider}/>
        <Typography variant = "h6">Lend Date:</Typography>
        <Typography variant = "body1">{props.item.lendInfo.lendDate}</Typography>
        <Divider className = {classes.divider}/>
        <Typography variant = "h6">Expected Return:</Typography>
        <Typography variant = "body1">{props.item.lendInfo.expectedReturnDate}</Typography>
        <Divider className = {classes.divider}/>
        <Typography variant = "h6">TSS Employee Name:</Typography>
        <Typography variant = "body1">{props.item.lendInfo.tssEmployeeName}</Typography>
     </div>
  );
}