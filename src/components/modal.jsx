import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ActionModal = ({ handleToggle, open, children }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '3px',
    p: 4,
    padding: '0.4rem 0.3rem',
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </>
  )
}
export default ActionModal

ActionModal.propTypes = {
  handleToggle: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
};