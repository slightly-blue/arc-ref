import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styled } from '@mui/material/styles';

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

  return (
    <div className="top-bar-container">
       <ButtonGroup variant="text" aria-label="text button group">
         <div style={{position: 'absolute', fontSize: '0.7rem', left: '2.9rem', top: '1.8rem', color:"#28572A"}}>current project</div>
          <TopBarButton className="top-bar-button" startIcon={<MenuBookIcon />}>project name</TopBarButton>
          <TopBarButton className="top-bar-button" startIcon={<SettingsIcon />}>Citation style</TopBarButton>
          <TopBarButton className="top-bar-button" startIcon={<AddIcon />}> New Reference</TopBarButton>
        </ButtonGroup>
    </div>
  )
}
export default TopBar