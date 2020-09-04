import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: '10',
  },
});

const Overlay = ({ onClick }) => {
  const classes = useStyles();

  return <div className={classes.overlay} onClick={onClick} />;
};

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Overlay;
