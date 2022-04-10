import { Button, Typography } from '@mui/material';
import React from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useSelector } from 'react-redux';


const Bibliography = () => {
  const state = useSelector((state) => state)
  const citations = state.projects ? state.projects[state.active_project.index].citations : undefined

 
  //console.log(citations)
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

  const CitationComponent = ({ citation }) => {

    const format = [
      "Book",
      "Edited Book",
      "E-Book",
      "Journal Article",
      "Newspaper Article",
      "Photograph",
      "Film",
      "TV Programme",
      "Music", // song or album?
      "Website",
      "Tweet"
    ]

    // https://www.mendeley.com/guides/harvard-citation-guide/
    // https://www.mendeley.com/guides/ultimate-citation-cheat-sheet/
    // https://www.mendeley.com/guides/web-citation-guide/

    // Book 
    // Author surname(s), initial(s).(Year Published) <i>Title</i>. Edition. Place of publication: publisher.
    // ex: Mitchell, J.A. and Thomson, M. (2017) A guide to citation.3rd edn. London: London Publishings.

    // edited book 
    // Editor surname(s), initial(s). (eds.) (Year Published). Title. Edition. Place of publication: publishers
    // ex: William, S.T. (eds.) (2015) Referencing: a guide to citation rules. New York: My Publisher


    // e.book
    // Author surname(s), initial(s). (Year Published). Title. Edition. E-book format [e-book reader]. Available at URL or DOI (Accessed: day month year)
    // 


    // newspaper 
    // Author surname(s), initial(s). (Year) ‘Article Title’, Newspaper Title (edition), day month, page number(s).

    // Website 
    // Mitchell, J.A and Thomson, M. (2017). How and when to reference [Online]. Available at: https://www.howandwhentoreference.com/APAcitation (Accessed: 21 August 2017).



    // Add icon depending on format 
    const author_surname_and_initials = citation.authors
    const eds = "(eds.)"
    const year_of_publishing = citation.year_of_publishing
    const title = citation.title
    const edition = ""
    const ebook_format_and_reader = ""
    const place_of_publication_and_publisher = ""
    const numbers = "" // page numbers , volumes, issue etc 
    const available_at = "Available at: "
    const url = <a href={citation.URL}>{citation.URL}</a>

    return (
      <p style={{ marginLeft: '1cm', textIndent: '-1cm', fontFamily: '"Times New Roman", Times, serif' }}>
        {author_surname_and_initials}. {year_of_publishing}. <i>{title}</i> {edition} {place_of_publication_and_publisher}, {numbers}
        [online] {citation.publisher}. Available at: <a href={citation.URL}>{citation.URL}</a> [Accessed {citation.access_date}].
      </p>
    )
  }
  return (
    <div className='main-content'>
      <Button variant="text" endIcon={<ContentCopyOutlinedIcon />} onClick={copyToClip}>Bibliography</Button>
      <div style={{ padding: '0rem 2rem' }}>
        <div id='bibliography-content'>
          {citations && <div style={{ maxWidth: '30rem', overflow: 'hidden' }}><pre>{JSON.stringify(citations, null, 2)}</pre></div>}
          {citations &&
            citations.map((item, i) => (
              <CitationComponent key={i} citation={item} />
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