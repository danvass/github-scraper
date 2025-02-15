
const selectors=require('../config/repos')

/**
 * followers method parses a given GitHub user's followers/following/stars list
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub username or url e.g: /{username}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub repositories (for the user)
 */
module.exports = function followers ($, url, callback) {
  console.log(url)
  var data = { entries : [], url: url};
  data.type = url.match(/tab=following/) ? 'following' : 'followers';


$(`${selectors.FOLLOWERS}`).each(function(i,el){

  data.entries.push({
    avatar:$(this).find('a').first().find('img').first().attr("src"),
    fullname:$(this).find('a span').first().text(),
     username:$(this).find('a span').last().text()
  })
})


  data = require('./next_page')($, data); // don't worry require is cached ;-)
  callback(null, data)
}
