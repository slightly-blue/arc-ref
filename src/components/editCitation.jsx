import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import LinearProgress from '@mui/material/LinearProgress';
import './create_reference.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { TYPES_OF_WORK } from './types_of_work'



const EditCitationModal = ({ closeModal, referenceId }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState('');
  const [format, setFormat] = React.useState('');

  const state = useSelector((state) => state)

  useEffect(() => {
    const citation = state.projects[state.active_project.index].citations[referenceId]
    setData(citation)
    setFormat(citation.type_of_work)
  }, [state]);

  useEffect(() => {
    if (data) {
      setData({
        ...data,
        type_of_work: format
      })
    }
  }, [format]);

  const handleModification = (key, newValue) => {
    setData({
      ...data,
      [key]: newValue,
    })
  }

  // TODO: Modify instead of adding
  const dispatchReference = () => {
    dispatch({
      type: 'ADD_CITATION',
      payload: data
    })
    closeModal();
  }

  const isRequired = (key) => {
    return TYPES_OF_WORK[format]?.required.includes(key) ?? false
  }
  const isDisabled = (key) => {
    console.log("type key" + format, key)
    return !(TYPES_OF_WORK[format]?.shown.includes(key)) ?? false
  }


  return (
    <div className='create-reference'>
      {data &&
        <FormControl variant="standard" sx={{ marginLeft: '1rem', width: '25rem', marginTop: '2rem', marginBottom: '2rem' }} helperText="Some important text">
          <InputLabel id="select-type-of-work-label">Type of work</InputLabel>
          <Select
            labelId="select-type-of-work-label"
            value={format}
            label="Type of work"
            onChange={(e) => setFormat(e.target.value)}
          >
            {Object.keys(TYPES_OF_WORK).map((item, i) => (
              <MenuItem key={i} value={item}>{item}</MenuItem>
            ))}
          </Select>
          <FormHelperText>The fields below, not required by the selected format, are disabled</FormHelperText>
        </FormControl>
      }
      {data &&
        Object.keys(data).map((key, i) => (
          <TextField
            key={i}
            sx={{ marginLeft: '1rem', width: '25rem', marginTop: '1rem' }}
            id="standard-basic"
            label={key}
            defaultValue={data[key]}
            onChange={(e) => handleModification(key, e.target.value)}
            variant="standard"
            required={isRequired(key)}
            disabled={isDisabled(key)}
          />
        ))
      }

      <div>
        <Button sx={{ position: 'relative', margin: '2rem 1rem', marginLeft: '17rem' }} variant="outlined" disabled={!data} onClick={dispatchReference}>modify reference</Button>
      </div>

    </div>
  )
}
export default EditCitationModal