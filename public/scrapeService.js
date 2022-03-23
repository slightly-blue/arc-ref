


const scrapeService = async (test_url) => {
  const axios = require('axios');
  const cheerio = require('cheerio');
  const document_info = {
    title: "",
    type: "",
    author: "",
    authors: [
      // {
      //   author: "",
      //   institution: "",
      // }
    ],
    published_date: "",
    journal: "",
    publisher: "",
    volume_no: "",
    issue_no: "",
    pages_used: "",
    doi: "",
    database: "",
    URL: test_url,
    access_date: "",
    html: '',
  }


  return axios.get(test_url)
    .then(res => {

      //console.log(res.data)
      //document_info.html = res
      const $ = cheerio.load(res.data)

      // Authors 

      if ($('meta[name=citation_author]').length){
        $('meta[name=citation_author]').each((index, element) => {
          document_info.authors.push(
            {
              author: $(element).attr('content'),
              institution: $('meta[name=citation_author_institution]').eq(index).attr('content') ?? ""
            }
          )
        });
      } else {
        $('meta[name=dc.creator]').each((index, element) => {
          document_info.authors.push(
            {
              author: $(element).attr('content'),
              institution: ""
            }
          )
        });
      }

      // Title 

      document_info.title = $('meta[name=citation_title]').attr('content') 
                        ??  $('meta[name=dc.title]').attr('content')

      // Date

      document_info.published_date = $('meta[name=prism.publicationDate]').attr('content') 
                                  ??  $('meta[name=dc.date]').attr('content')

      // journal 
      document_info.journal = $('meta[name=citation_journal_title]').attr('content') 
                          ??  $('meta[name=prism.publicationName]').attr('content')
                          
      // publisher 
      document_info.publisher = $('meta[name=citation_publisher]').attr('content') 
      ??  $('meta[name=dc.publisher]').attr('content')


      // volume
      document_info.volume_no = $('meta[name=citation_volume]').attr('content') 
      ??  $('meta[name=prism.volume]').attr('content')

      // issue 
      document_info.issue_no = $('meta[name=citation_issue]').attr('content') 

      //document_info.pages_used = $('meta[name=citation_volume]').attr('content') 

      document_info.doi = $('meta[name=DOI]').attr('content') ??  $('meta[name=prism.doi]').attr('content')

      document_info.type = $('meta[name=citation_article_type]').attr('content') ?? $('meta[name=dc.type]').attr('content') 

      //document_info.URL = $('meta[name=citation_volume]').attr('content') 

      const today = new Date();
      document_info.access_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 
      //document_info.html = $('meta[name=citation_volume]').attr('content') 

      // dc.
      // prism.
      // citation_

      console.log(document_info)
      // 
      return document_info

    }).catch(err => {
      console.error(err) 
      throw err
    })


  // inspiration: http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata
  // 1. check type of source

  // 2. find author

  // 3. find title of article or work
  // <title> tag

  // 4. find published date 

  // use axios 

 
}
module.exports = { scrapeService }
//export default scrapeService