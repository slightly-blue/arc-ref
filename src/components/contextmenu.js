import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionModal from './modal';
import EditCitationModal from './editCitation';

const ContextMenu = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [listenerExist, setListenerExist] = useState(false);
  const [position, setPosition] = useState(false);
  const [selected, setSelected] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!listenerExist) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('click', handleClick);
    }
    setListenerExist(true);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault()

    if (event.target.id.includes("citation")) {
      setSelected(event.target.id.replace("citation-", ""))
      setPosition({ x: event.x, y: event.y })
      setShow(true)
    }
    if (event.target.parentNode.id.includes("citation")) {
      setSelected(event.target.parentNode.id.replace("citation-", ""))
      setPosition({ x: event.x, y: event.y })
      setShow(true)
    }
  }

  const handleClick = () => {
    setShow(false)
  }

  const handleEdit = () => {
    setEditOpen(true)
  }

  // TODO: Fix deletion of citations 
  const handleDelete = () => {
    dispatch({
      type: 'DELETE_CITATION',
      payload: selected,
    })
  }

  const cssStyle = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    display: show ? 'block' : 'none',
    zIndex: '999',
  }

  return (
    <>
      <ActionModal handleToggle={() => setEditOpen(!editOpen)} open={editOpen}>
        <EditCitationModal referenceId={selected} closeModal={() => setEditOpen(false)} />
      </ActionModal>

      <Paper style={cssStyle} sx={{ width: 150, maxWidth: '100%' }}>
        <MenuList style={{ fontSize: '12px' }}>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText disableTypography={true} style={{ fontSize: '12px' }} >Edit {selected}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText disableTypography={true} style={{ fontSize: '12px' }} >Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  )
}
export default ContextMenu;