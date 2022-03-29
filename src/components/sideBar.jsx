import { Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import React from 'react';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { styled } from '@mui/material/styles';

const SideBar = () => {

  const ProjectItem = () => {
    return <div className='project-item'>
      <BookOutlinedIcon fontSize="small" sx={{margin: '0rem 1rem'}}/>
      <div>
        <Typography variant='body2' sx={{fontSize: '0.8rem', lineHeight: '0.8rem'}}>project name</Typography>
        <Typography component='p' variant='caption' sx={{fontSize: '0.6rem', marginTop: '0rem', lineHeight: '0.6rem'}}>23 sources</Typography>
      </div>
    </div>
  }

  const AddButton = styled(Button)({
    fontSize: 12,
    textTransform: "none",
    maxHeight: '1.4rem',
    maxWidth: '2rem',
    margin: '0.5rem',
    marginTop: '1.5rem',
  })

  const FilterTextField = styled(TextField)({
    fontSize: 12,
    margin: '0.5rem',
    maxWidth: '5rem',
    '& .MuiInput-root': {
      fontSize: 12,
    },
    '& .MuiInputLabel-root': {
      fontSize: 12,
    }
  })

  return (
    <div className="side-bar-container">
      <div className="side-bar-actions-container">
        <FilterTextField label="Filter" variant="standard" size="small" />
        <AddButton variant="outlined" size="small">Add</AddButton>
      </div>
      <div>
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
      </div>
    </div>
  )
}
export default SideBar