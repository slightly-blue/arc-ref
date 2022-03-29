import { Button, Typography } from '@mui/material';
import React from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const Bibliography = () => {

  return (
    <div className='main-content'>
      <Button variant="text" endIcon={<ContentCopyOutlinedIcon/>}>Bibliography</Button>
      <div>
        <Typography variant="body1" color="initial" sx={{marginLeft: '1rem'}}>
          Lee, D., Kim, C., Kim, S., Cho, M. and Han, W., 2022. <i>Autoregressive Image Generation using Residual Quantization.</i> 
          [online] arXiv.org. Available at: https://arxiv.org/abs/2203.01941v2 [Accessed 29 March 2022].
        </Typography>
      </div>
    </div>
  )
}
export default Bibliography