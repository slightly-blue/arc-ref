// let { ipcMain } = require("electron")

// ipcMain.handle("console", (event, line) => {
//   console.log(`Received from frontend: ${line}`)
//   return `Backend confirms it received: ${line}`
// })

// const scrapeService = () => {
//   var Nightmare = require('nightmare');
//   var nightmare = Nightmare({
//     electronPath: require('electron'), //`${__dirname}\\node_modules\\electron`
//     show: true
//   });

//   nightmare
//     .goto('http://yahoo.com')
//     .type('form[action*="/search"] [name=p]', 'github nightmare')
//     .click('form[action*="/search"] [type=submit]')
//     .wait('#main')
//     .evaluate(function () {
//       return document.querySelector('#main .searchCenterMiddle li a').href
//     })
//     .end()
//     .then(function (result) {
//       document.getElementById("results").innerHTML = result;
//     })
//     .catch(function (error) {
//       console.error('Search failed:', error);
//     });
// }
// export default scrapeService