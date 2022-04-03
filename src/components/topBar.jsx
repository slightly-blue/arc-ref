import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styled } from '@mui/material/styles';
import ActionModal from './modal';
import CreateReference from './create_reference';
import { useSelector } from 'react-redux';

const TopBar = () => {
  const TopBarButton = styled(Button)({
    fontSize: 12,
    textTransform: "none",
    textAlign: "left",
    justifyContent: "flex-start",
    paddingRight: '1rem',
    minHeight: '3rem',
    '& .MuiButton-startIcon':{
      marginLeft: '10px',
    },
  });
  
  const [referenceOpen, setReferenceOpen] = React.useState(false);
  const referenceToggle = () => setReferenceOpen(!referenceOpen);

  const [styleOpen, setStyleOpen] = React.useState(false);
  const styleToggle = () => setStyleOpen(!styleOpen);

  const activeProject = useSelector((state) => state.active_project)

  return (
    <div className="top-bar-container">
       <ButtonGroup variant="text" aria-label="text button group">
         <div style={{position: 'absolute', fontSize: '0.7rem', left: '2.9rem', top: '1.8rem', color:"#28572A"}}>current project</div>
          <TopBarButton className="top-bar-button" startIcon={<MenuBookIcon />}>{activeProject ? activeProject.name : "No project selected"}</TopBarButton>
          <TopBarButton className="top-bar-button" startIcon={<SettingsIcon />} onClick={styleToggle} >Citation style</TopBarButton>
          <TopBarButton className="top-bar-button" startIcon={<AddIcon />} onClick={referenceToggle}> New Reference</TopBarButton>
        </ButtonGroup>
        <ActionModal handleToggle={referenceToggle} open={referenceOpen}> <CreateReference/> </ActionModal>
        <ActionModal handleToggle={styleToggle} open={styleOpen}>style~ </ActionModal>
    </div>
  )
}
export default TopBar