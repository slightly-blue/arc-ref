import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import LinearProgress from '@mui/material/LinearProgress';
import './create_reference.css'
import { useDispatch } from 'react-redux';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {TYPES_OF_WORK} from './types_of_work'



const CreateReference = ({ closeModal }) => {
  //const { ipcRenderer } = window.require('electron');
  //const [progress, setProgress] = React.useState(33);
  const dispatch = useDispatch()
  const [site, setSite] = React.useState('');
  const [data, setData] = React.useState('');
  const [format, setFormat] = React.useState('');
  const [scrapeStatus, setScrapeStatus] = React.useState('');
  const { electronAPI } = window;

  const handleChange = (event) => {
    setSite(event.target.value);
  };

  // Load data from backend on scrape 
  useEffect(() => {
    console.log("setting event listener")
    electronAPI.receive('scrape-result', (data) => {
      //handle on download-progress event
      //console.log(data)
      setScrapeStatus(data)
      if (data && data.document_info) {
        setData(data.document_info)
        setFormat(data.data)
      }
    });
  }, []);

  useEffect(() => {
    if(data){
      setData({
        ...data,
        type_of_work: format
      })
    }
  }, [format]);

  const handleCreateReferenceClick = async () => {
    window.electronAPI.setSite(site)
  }

  const handleModification = (key, newValue) => {
    setData({
      ...data,
      [key]: newValue,
    })
  }

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
      <div>
        <TextField onChange={handleChange} sx={{ marginLeft: '1rem', width: '25rem', marginTop: '5rem' }} id="standard-basic" label="URL to Article, Jurnal, PDF, etc..." variant="standard" />
      </div>

      <div>
        <Button onClick={handleCreateReferenceClick} sx={{ marginLeft: '1rem', marginTop: '0.5rem', marginBottom: '2rem', padding: '1px 0.5rem', lineHeight: '1rem', fontSize: '0.8rem' }} variant="outlined">create reference</Button>
      </div>

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

      {data && //data.format !== undefined &&
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
      {/* <div>
        <LinearProgress sx={{ marginTop: '5rem' }} variant="determinate" value={progress} />
        <div style={{ position: 'relative', color: 'rgba(0, 0, 0, 0.87)' }}>
          <span>Creating reference...</span><span style={{ position: 'absolute', right: '0px' }}>scraping</span>
        </div>
      </div> */}

      <div>
        <Button sx={{ position: 'relative', margin: '2rem 1rem', marginLeft: '17rem' }} variant="outlined" disabled={!data} onClick={dispatchReference}>add reference</Button>
      </div>

    </div>
  )
}
export default CreateReference