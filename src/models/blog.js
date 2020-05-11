const KC = require('kentico-cloud-delivery')

module.exports = class Blog extends KC.ContentItem {
    constructor(){
        super({
            linkResolver: (link, _context) => {
                return`/${link.urlSlug}`
            },
        })
    }
}