import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import './create_reference.css'

const CreateReference = () => {




  //let ipcRenderer = window.Electron.ipcRenderer

  // let form = document.querySelector("form")
  // let input = document.querySelector("input")
  // let responses = document.querySelector("#responses")
  
  // form.addEventListener("submit", async (e) => {
  //   e.preventDefault()
  //   let line = input.value
  //   input.value = ""
  //   let responseText = await ipcRenderer.invoke("console", line)
  //   let response = document.createElement("div")
  //   response.textContent = responseText
  //   responses.appendChild(response)
  // })



  const [progress, setProgress] = React.useState(33);

  const [site, setSite] = React.useState('');
  const [data, setData] = React.useState('');

  const handleChange = (event) => {
    setSite(event.target.value);
  };

  const handleClick = async () => {
    const responseText =  await window.electronAPI.setSite(site)
    setData(responseText)
    console.log(responseText)

  }

  return (
    <div className='create-reference'>
      <div>
        <TextField onChange={handleChange} sx={{ width: '20rem',marginTop: '5rem' }} id="standard-basic" label="URL to Article, Jurnal, PDF, etc..." variant="standard" />
      </div>

      <div>
        <Button onClick={handleClick} sx={{ marginTop: '0.5rem', padding: '1px 0.5rem', lineHeight: '1rem', fontSize: '0.8rem' }} variant="outlined">create reference</Button>
      </div>

      <div>
        <LinearProgress sx={{ marginTop: '5rem' }} variant="determinate" value={progress} />
        <div style={{ position: 'relative', color: 'rgba(0, 0, 0, 0.87)' }}>
          <span>Creating reference...</span><span style={{ position: 'absolute', right: '0px' }}>scraping</span>
        </div>
      </div>

      <div style={{maxWidth: '30rem'}}><pre>{JSON.stringify(data, null, 2) }</pre></div>

    </div>
  )
}
export default CreateReference