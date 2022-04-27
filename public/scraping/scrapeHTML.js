

const cheerio = require('cheerio');
const { CITATION_VARIABLES } = require('../../src/components/citation_variables')

// time validation
const ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i

const scrapeHTML = (html, url) => {
  // Takes a html document and parses data relevant to citing the document 
  //
  // when finding a value for example author:
  //  first looks trough meta tag name [http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata]
  //  then itemprops
  //  then meta properties
  //  then ld_json [https://json-ld.org/]
  //  then more creative regex solutions 
  //
  // returns an object with document info in the structure of CITATION_VARIABLES


  const $ = cheerio.load(html)
  const document_info = CITATION_VARIABLES
  document_info.url = url

  // TODO: and a clause to skip if content if NaN or "undefined" or null
  const metaNameCheck = (names) => {
    // takes an array of names and looks trough meta tags with that name 
    // returns a string or array of strings for the first matched item in the input array 
    // function is not case sensitive 
    for (let i = 0; i < names.length; i++) {
      if ($("meta[name='" + names[i] + "' i]").length > 1) {
        let arr = []
        $("meta[name='" + names[i] + "' i]").each(function () {
          let content = $( this ).attr('content')
          if(content){
            arr.push(content)
          }
        });
        if(arr.length !== 0){
          return arr
        }
      } else {
        let content = $("meta[name='" + names[i] + "' i]").attr('content')
        if (content) {
          return content
        }
      }
    }
    return undefined
  }

  const metaPropertyCheck = (names) => {
    // takes an array of names and looks trough meta tags with that property 
    // returns a string or array of strings for the first matched item in the input array 
    // function is not case sensitive 
    for (let i = 0; i < names.length; i++) {
      if ($("meta[property*='" + names[i] + "' i]").length > 1) {
        let arr = []
        $("meta[property*='" + names[i] + "' i]").each((element) => {
          let content = $(element).attr('content')
          if(content){
            arr.push(content)
          }
        });
        if(arr.length !== 0){
          return arr
        }
      } else {
        let content = $("meta[property=*'" + names[i] + "' i]").attr('content')
        if (content) {
          return content
        }
      }
    }
    return undefined
  }

  const itemPropCheck = (names) => {
    // takes an array of itemprop names and looks trough all tags with that attribute 
    // returns a string or array of strings for the first matched item in the input array 
    // function is not case sensitive 
    for (let i = 0; i < names.length; i++) {
      if ($("[itemprop*='" + names[i] + "' i]").length > 1) {
        let arr = []
        $("[itemprop*='" + names[i] + "' i]").each((element) => {
          arr.push($(element).attr('content') ?? $(element).text())
        });
        return arr

      } else {
        let content = $("[itemprop*='" + names[i] + "' i]").attr('content') ?? $("[itemprop*='" + names[i] + "' i]").text().replace(/^\s+|\s+$/g, '');
        if (content) {
          return content
        }
      }
    }
    return undefined
  }


  const ld_json = () => {
    // Get info from application/ld+json 
    // returns a json object of parsed data
    // docs: https://json-ld.org/
    // docs: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
    try {
      const ld = JSON.parse($('script[type="application/ld+json"]').html())
      if (ld) { return ld["@graph"][0] }
    } catch (e) { console.log(e) }
  }

  const metaNameRegexCheck = (regex) => {
    const tags =
      $('meta').filter(function () { 
        return (regex).test($(this).attr('name'))
      })
    if (tags.length > 1) { // multiple has not been verified to work
      let arr = []
      tags.each((el) => {
        arr.push($(el).attr('content'))
      })
      return arr
    } else {
      return tags.attr('content') // works
    }
  }


  document_info.authors =
    metaNameCheck([
      'citation_author',
      'citation_authors',
      'dcterms.creator',
      'dc.creator',
      //'dc.Creator',
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
      //'dc.Title',
      //'DC.title',
      //'DC.Title',
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
      //'dc.Date',
      //'DC.date',
      'dcterms.Date',
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
      'dcterms.Type',
      //'dc.Type',
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
      //'dc.Publisher',
      'dcterms.Publisher',
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
     // 'dc.Identifier',
     // 'dcterms.Identifier',
      'eprints.id_number'
    ])

  const today = new Date();
  document_info.access_date = (today.getMonth() + 1) + '.' + today.getDate() + '.' + today.getFullYear();

  // $("head meta").each(function () {
  //   // print in blue
  //   console.log('\x1b[34m%s\x1b[0m', $(this).clone().wrap('<div>').parent().html())
  // });

  //console.log(document_info) 

  console.log({ document_info: document_info, data: undefined })
  return { document_info: document_info, data: undefined }

}
module.exports = { scrapeHTML }