import { Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import React from 'react';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { styled } from '@mui/material/styles';
import ActionModal from './modal';
import { CardActionArea } from '@mui/material';
//import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const SideBar = () => {

  const dispatch = useDispatch()
  const [addProjectOpen, setAddProjectOpen] = React.useState(false);
  const addProjectToggle = () => setAddProjectOpen(!addProjectOpen);

  const selectProject = (selected) => {
    dispatch({
      type: 'SELECT_PROJECT',
      payload: selected
    })
  }

  // eslint-disable-next-line react/prop-types
  const ProjectItem = ({ name, sourcesNum }) => {
    return (
      <CardActionArea onClick={() => selectProject(name)}>
        <div className='project-item'>
          <BookOutlinedIcon fontSize="small" sx={{ margin: '0rem 1rem' }} />
          <div>
            <Typography variant='body2' sx={{ fontSize: '0.8rem', lineHeight: '0.8rem' }}>{name}</Typography>
            <Typography component='p' variant='caption' sx={{ fontSize: '0.6rem', marginTop: '0rem', lineHeight: '0.6rem' }}>{sourcesNum} sources</Typography>
          </div>
        </div>
      </CardActionArea>
    )
  }

  const ProjectList = () => {
    const projects = useSelector((state) => state.projects)
    return (
      <div className='project-list'>
        {projects && projects.map((item, i) => (  //Object.keys(projects).length !== 0 
          <ProjectItem key={i} name={item.project} sourcesNum={"X"} />
        ))}
      </div>
    )
  }

  const NewProjectComponent = () => {
    const [name, setName] = React.useState();


    // const addProject = async () => {
    //   const project = { project: name, references: "", style: "" }
    //   () => dispatch({type: 'CREATE_PROJECT', payload: project})
    //   addProjectToggle()

    //   // TODO: Check that project is unique 
    //   // let responseText = await window.electronAPI.getStoreValue('projects')
    //   // const project = { project: name, references: "", style: "" }

    //   // if (responseText) {
    //   //   responseText.push(project)
    //   // } else {
    //   //   responseText = [project]
    //   // }

    //   // window.electronAPI.setStoreValue(['projects', responseText])
    //   // console.log(responseText)
    //   // addProjectToggle()
    // }
    const addProject = () => {
      dispatch({
        type: 'ADD_PROJECT',
        payload: {
          project: name,
          references: "",
          style: ""
        }
      })
      addProjectToggle()
    }

    return (
      <div style={{ margin: '1rem auto', width: '11rem' }}>
        <div style={{ marginLeft: '0.5rem' }}> New project</div>
        <div className="flex" >
          <FilterTextField label="Name" variant="standard" size="small" onChange={(e) => setName(e.target.value)} />
          <AddButton variant="outlined" size="small" onClick={addProject}>Create</AddButton>
        </div>
      </div>
    )
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
        <AddButton variant="outlined" size="small" onClick={addProjectToggle}>Add</AddButton>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        {/* <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem /> */}
        <ProjectList />
      </div>
      <ActionModal handleToggle={addProjectToggle} open={addProjectOpen}>
        <NewProjectComponent />
      </ActionModal>
    </div>
  )
}
export default SideBar