


const scrapeService = async (test_url) => {
  const axios = require('axios');
  const cheerio = require('cheerio');
  
  // time validation
  const ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i

  const document_info = {
    title: undefined,
    type: undefined,
    authors: undefined,
    published_date: undefined,
    year_of_publishing: undefined,
    journal: undefined,
    publisher: undefined,

    volume_no: undefined,
    issue_no: undefined,
    pages_used: undefined,

    doi: undefined,
    database: undefined,
    URL: test_url,
    access_date: undefined,

    series_season: undefined,
    series_episode: undefined,
  }

  const form = [
    "Book",
    "Edited Book",
    "E-Book",
    "Journal Article",
    "Newspaper Article",
    "Photograph",
    "Film",
    "TV Programme",
    "Music",
    "Website"
  ]
// scraping do not work on sites that uses javascript to load it's content 
// e.g. sites protected by cloudflare 

// pretend to be a Samsung Galaxy S9
  return axios.get(test_url, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36' }  } )
    .then(res => {
      //console.log(res.data)
      //document_info.html = res
      const $ = cheerio.load(res.data)

      const metaNameCheck = (names) => {
        // Checks trough meta names for first valid name(s) and returns content
        for (let i = 0; i < names.length; i++) {
          if ($('meta[name=' + names[i] + ']').length > 1) {
            let arr = []
            $('meta[name=' + names[i] + ']').each((element) => {
              arr.push($(element).attr('content'))
            });
            return arr

          } else {
            let content = $('meta[name=' + names[i] + ']').attr('content')
            if (content) {
              return content
            }
          }
        }
        return undefined
      }
      const metaPropertyCheck = (names) => {
        // Checks trough meta names for first valid name(s) and returns content
        for (let i = 0; i < names.length; i++) {
          if ($('meta[property=' + names[i] + ']').length > 1) {
            let arr = []
            $('meta[property=' + names[i] + ']').each((element) => {
              arr.push($(element).attr('content'))
            });
            return arr

          } else {
            let content = $('meta[property=' + names[i] + ']').attr('content')
            if (content) {
              return content
            }
          }
        }
        return undefined
      }
      const itemPropCheck = (names) => {
        for (let i = 0; i < names.length; i++) {
          if ($('[itemprop="' + names[i] + '"]').length > 1) {
            let arr = []
            $('[itemprop="' + names[i] + '"]').each((element) => {
              arr.push($(element).attr('content') ?? $(element).text())
            });
            return arr

          } else {
            let content = $('[itemprop="' + names[i] + '"]').attr('content') ?? $('[itemprop="' + names[i] + '"]').text().replace(/^\s+|\s+$/g, '');
            if (content) {
              return content
            }
          }
        }
        return undefined
      }

      // Get info from application/ld+json 
      // docs: https://json-ld.org/
      // docs: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
      const ld_json = () => {
        try {
          const ld = JSON.parse($('script[type="application/ld+json"]').html())
          if (ld) { return ld["@graph"][0] }
        } catch (e) { console.log(e) }
      }

      const metaNameRegexCheck = (regex) => {
        const tags = 
          $('meta').filter(function () {  // match any meta name tag with publish in it with a ISO_8601 date string 
            return (regex).test($(this).attr('name'))
          })
        if(tags.length > 1) { // multiple has not been verified to work
          let arr = []
          tags.each((el) => {
            arr.push($(el).attr('content'))
          })
          return arr
        } else {
          return tags.attr('content') // works
        }
      }

      // get as much info as possible from meta tags 
      document_info.authors =
        metaNameCheck([
          'citation_author',
          'citation_authors',
          'dcterms.creator',
          'dc.creator',
          'dc.Creator',
          'eprints.creators_name',
          'bepress_citation_author'
        ]) ??
        itemPropCheck(['author']) ??
        ld_json()?.author.map(author => { return author.name }) ??
        metaNameRegexCheck(/author/i)

        // todo data-rh ?

      document_info.authors_institution =
        metaNameCheck([
          'citation_author_institution',
          'prism.place',
          'bepress_citation_author_institution',
          'pur.place'
        ])

      document_info.title =
        metaNameCheck([
          'citation_title',
          'dc.title',
          'dcterms.title',
          'eprints.title',
          'bepress_citation_title',
          'prism.alternateTitle'
        ]) ??
        itemPropCheck(['headline']) ??
        $('title').text()

      document_info.published_date =
        metaNameCheck([
          'citation_date',
          'prism.publicationDate',
          'dc.date',
          'dcterms.date',
          'dcterms.created',
          'eprints.date',
          'bepress_citation_date',
          'eprints.datestamp'
        ]) ??
        itemPropCheck(['datePublished']) ??
        metaNameCheck(['article:published_time']) ??
        metaPropertyCheck(['article:published_time']) ??
        ld_json()?.datePublished ??

        $('meta').filter(function () {  // match any meta name tag with "publish" in it matching a ISO_8601 date string 
          return (/publish/i).test($(this).attr('name')) && ISO_8601.test($(this).attr('content'))
        }).attr('content')

      document_info.year_of_publishing = new Date(document_info.published_date).getUTCFullYear()
      //document_info.published_date = itemPropCheck(['datePublished'])

      document_info.type_of_work =
        metaNameCheck([
          'citation_dissertation_name',
          'dcterms.type',
          'dc.type',
          'prism.contentType',
          'eprints.type'
        ])

      document_info.journal =
        metaNameCheck([
          'citation_journal_title',
          'prism.publicationName'
        ])

      document_info.publisher =
        metaNameCheck([
          'citation_publisher',
          'dc.publisher',
          'dcterms.publisher',
          'prism.corporateEntity',
          'eprints.publisher',
          'bepress_citation_publisher'
        ]) ??
        ld_json()?.publisher?.name

      document_info.volume_no =
        metaNameCheck([
          'citation_volume',
          'prism.volume',
          'pur.volume',
          'eprints.volume',
          'bepress_citation_volume'
        ])

      document_info.issue_no =
        metaNameCheck([
          'citation_issue',
          'prism.number',
          'pur.number',
          'eprints.number',
          'bepress_citation_issue'
        ])

      document_info.doi =
        metaNameCheck([
          'DOI',
          'prism.doi',
          'bepress_citation_doi',
          'dcterms.identifier',
          'dc.identifier',
          'eprints.id_number'
        ])

      const today = new Date();
      document_info.access_date = (today.getMonth() + 1)  + '.' + today.getDate() + '.' + today.getFullYear();

      $("head meta").each(function () {
        console.log($(this).clone().wrap('<div>').parent().html())
      });

      //console.log(document_info) 


      return {document_info: document_info, data: undefined}

    }).catch(err => {
      console.error(err)
      return {document_info: document_info, data: undefined, error: err}
    })


  // inspiration: http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata
  // 1. Check link type
  // 2. Check whois database 

  // Strategies:
  // - file endings
  // - meta tags
  // - DOI API lookup if available 
  // - pdf metadata 
  // - HTML itemprop attribute  
  // - 

  // use axios 


  // scraping decision tree:
  // - guess format
  // - depending on format try looking for additional info  


}
module.exports = { scrapeService }
//export default scrapeService