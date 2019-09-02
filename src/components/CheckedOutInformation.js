import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const propTypes = {
  item: PropTypes.object.isRequired,
};

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CheckedOutInformation({
  item,
}) {
  const classes = useStyles();

  return (
    <div>
        <Typography variant = "h6">Staff Member:</Typography>
        <Typography variant = "body1">{item.lendInfo.staffMemberName}</Typography>
        <Divider className = {classes.divider}/>
        <Typography variant = "h6">Lend Date:</Typography>
        <Typography variant = "body1">{item.lendInfo.lendDate.displayDate}</Typography>
        <Divider className = {classes.divider}/>
        <Typography variant = "h6">Expected Return:</Typography>
        <Typography variant = "body1">{item.lendInfo.expectedReturnDate.displayDate}</Typography>
        <Divider className = {classes.divider}/>
        <Typography variant = "h6">TSS Employee Name:</Typography>
        <Typography variant = "body1">{item.lendInfo.tssEmployeeName}</Typography>
     </div>
  );
}

CheckedOutInformation.propTypes = propTypes;
