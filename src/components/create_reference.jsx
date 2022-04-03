import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import LinearProgress from '@mui/material/LinearProgress';
import './create_reference.css'

const CreateReference = () => {

  //const [progress, setProgress] = React.useState(33);

  const [site, setSite] = React.useState('');
  const [data, setData] = React.useState('');

  const handleChange = (event) => {
    setSite(event.target.value);
  };

  const handleClick = async () => {
    const responseText = await window.electronAPI.setSite(site)
    setData(responseText)
    console.log(responseText)

  }

  return (
    <div className='create-reference'>
      <div>
        <TextField onChange={handleChange} sx={{ marginLeft: '1rem', width: '25rem', marginTop: '5rem' }} id="standard-basic" label="URL to Article, Jurnal, PDF, etc..." variant="standard" />
      </div>

      <div>
        <Button onClick={handleClick} sx={{ marginLeft: '1rem', marginTop: '0.5rem', marginBottom: '2rem', padding: '1px 0.5rem', lineHeight: '1rem', fontSize: '0.8rem' }} variant="outlined">create reference</Button>
      </div>

      {data &&
        Object.keys(data).map((key, i) => (
          <TextField key={i} sx={{ marginLeft: '1rem', width: '25rem', marginTop: '0.5rem' }} id="standard-basic" label={key} defaultValue={data[key]} variant="standard" />
        ))
      }
      {/* <div>
        <LinearProgress sx={{ marginTop: '5rem' }} variant="determinate" value={progress} />
        <div style={{ position: 'relative', color: 'rgba(0, 0, 0, 0.87)' }}>
          <span>Creating reference...</span><span style={{ position: 'absolute', right: '0px' }}>scraping</span>
        </div>
      </div> */}

      <div>
        <Button sx={{ position: 'relative', margin: '2rem 1rem', marginLeft: '17rem' }} variant="outlined" disabled={!data} >add reference</Button>
      </div>

    </div>
  )
}
export default CreateReference