const scrapeService = async (test_url) => {
  //const axios = require('axios');

  const { BrowserWindow } = require('electron')
  const { scrapeHTML } = require('./scrapeHTML')

  // scraping with axios do not work on sites that uses javascript to load content. This also include all sites protected by cloudflare 
  // a workaround for this is to use electron 

  const win = new BrowserWindow({ width: 800, height: 600, show: false })
  win.webContents.once('dom-ready', () => {
    win.webContents.executeJavaScript(`document.head.innerHTML`).then((result) => {
      const citationData = scrapeHTML(result, test_url)
      // TODO: check format of text items and correct if necessary 

      let focusedWindow    = BrowserWindow.getFocusedWindow();
      focusedWindow.webContents.send('scrape-result', citationData);
    })
  })
  win.loadURL(test_url)

  console.log("electronScrapeService called")

 
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