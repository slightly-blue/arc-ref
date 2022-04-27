import { Button, Typography } from '@mui/material';
import React, {useEffect} from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useSelector } from 'react-redux';
import {TYPES_OF_WORK} from './types_of_work.js';


const Bibliography = () => {
  const state = useSelector((state) => state)
  useEffect(() => {
   // write to disk
   window.electronAPI.setStoreValue(['state', state])
  }, [state]);

  const citations = state.projects ? state.projects[state.active_project.index].citations : undefined

  /**
   * NOTES
   * enable hanging indents in google docs by going to:
   * "Format" -> "Align and indent" -> "indentation options" -> select "hanging" under "Special indent"
   */

  // TODO 
  // sort citations alphabetically by author (null => source title (excluding a, an, the) ) 
  // 

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

  const CitationComponent = ({ citation, index }) => {

    // https://www.mendeley.com/guides/harvard-citation-guide/
    // https://www.mendeley.com/guides/ultimate-citation-cheat-sheet/
    // https://www.mendeley.com/guides/web-citation-guide/

    const css = { marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }
    const props = {style: css, id: "citation-" + index }
    
    return TYPES_OF_WORK[citation.type_of_work].formatting(citation, props)
  

    // return (
    //   <p style={{ marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }}>
    //     {author_surname_and_initials}. {year_of_publishing}. <i>{title}</i> {edition} {place_of_publication_and_publisher}, {numbers}
    //     [online] {citation.publisher}. Available at: <a href={citation.URL}>{citation.URL}</a> [Accessed {citation.access_date}].
    //   </p>
    // )
  }
  return (
    <div className='main-content'>
      <Button variant="text" endIcon={<ContentCopyOutlinedIcon />} onClick={copyToClip}>Bibliography</Button>
      <div style={{ padding: '0rem 2rem' }}>
        <div id='bibliography-content'>
          {/* {citations && <div style={{ maxWidth: '30rem', overflow: 'hidden' }}><pre>{JSON.stringify(citations, null, 2)}</pre></div>} */}
          {citations &&
            citations.map((item, i) => (
              <CitationComponent key={i} index={i} citation={item} style={{ marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }}/>
            ))
          }
          {/* these work in microsoft word
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
          </p> */}
        </div>
      </div>
    </div>
  )
}
export default Bibliography