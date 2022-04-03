import { Button, Typography } from '@mui/material';
import React from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const Bibliography = () => {

  /**
   * NOTES
   * enable hanging indents in google docs by going to:
   * "Format" -> "Align and indent" -> "indentation options" -> select "hanging" under "Special indent"
   */

  // https://komsciguy.com/js/a-better-way-to-copy-text-to-clipboard-in-javascript/
  const copyRichText = (text) => {
    const listener = function (ev) {
      ev.preventDefault();
      ev.clipboardData.setData('text/html', text);
      //ev.clipboardData.setData('text/plain', text);
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  const copyToClip = () => {
    let copyText = document.querySelector("#bibliography-content");
    console.log(copyText.outerHTML)
    copyRichText(copyText.outerHTML)
  };

  return (
    <div className='main-content'>
      <Button variant="text" endIcon={<ContentCopyOutlinedIcon />} onClick={copyToClip}>Bibliography</Button>
      <div style={{ padding: '0rem 2rem' }}>
        <div id='bibliography-content'>
          {/* these work in microsoft word */}
          <p style={{ marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }}>
            Lee, D., Kim, C., Kim, S., Cho, M. and Han, W., 2022. <i>Autoregressive Image Generation using Residual Quantization.</i>
            [online] arXiv.org. Available at: <a href="https://arxiv.org/abs/2203.01941v2">https://arxiv.org/abs/2203.01941v2</a> [Accessed 29 March 2022].
          </p>
          <p style={{ marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }}>
            Lee, D., Kim, C., Kim, S., Cho, M. and Han, W., 2022. <i>Autoregressive Image Generation using Residual Quantization.</i>
            [online] arXiv.org. Available at: <a href="https://arxiv.org/abs/2203.01941v2">https://arxiv.org/abs/2203.01941v2</a> [Accessed 29 March 2022].
          </p>
          <p style={{ marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }}>
            Lee, D., Kim, C., Kim, S., Cho, M. and Han, W., 2022. <i>Autoregressive Image Generation using Residual Quantization.</i>
            [online] arXiv.org. Available at: <a href="https://arxiv.org/abs/2203.01941v2">https://arxiv.org/abs/2203.01941v2</a> [Accessed 29 March 2022].
          </p>
        </div>
      </div>
    </div>
  )
}
export default Bibliography