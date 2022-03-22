const scrapeService =  (test_url) => {
  const document_info = {
    title: "",
    type: "",
    firstName: "",
    lastName: "",
    yearPublished: "",
    Journal: "",
    VolumeNo: "",
    IssueNo: "",
    PagesUsed: "", 
    DOI: "",
    Database: "",
    URL: test_url,
    AccessDate: ""
  }


  // 1. check type of source

  // 2. find author

  // 3. find title of article or work
  
  // 4. find published date 

  // use axios 

  return document_info
}
module.exports = { scrapeService }
//export default scrapeService