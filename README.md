# ES6 Boilerplate with LESS
This is a very basic boilerplate which uses __webpack 4__ and __Babel 6__ to build the JavaScript. This makes it quite easy to configure, since __webpack 4__ needs almost no configuration out of the box, other than the __Babel__ loader, and __Babel__ has made things quite a bit easier with their *env* presets, too.

Since my [company](https://squarespace.com) uses __LESS__ as a CSS pre-processor, I've become quite used to it, so I included *less* and *less-watch-compiler* to handle the conversion. I also want all of the source files to be located in a single directory (*src*, natch) so I've included *cpx* to handle moving the HTML into *dist*, the target for the LESS compiler and __webpack__.

Though I did not include any web server since I like VS Code's [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), the NPM scripts do include *watch* functionality to make it even easier to see the changes. Speaking of which:

## NPM Scripts
### The ones you'll use
* `dev` - compile the LESS and copy to *dist*, copy the HTML to *dist*, and run webpack in *development* mode
* `build` - compile the LESS and copy to *dist*, copy the HTML to *dist*, and run webpack in *production (uglified)* mode
* `watch` - compile the LESS and watch, copy the HTML to *dist* and watch, and run webpack in *development* mode, watching for changes

### The ones used by the ones you'll use
* `copy` - move HTML files to *dist*
* `copy:watch` - move HTML files to *dist* and rerun on changes
* `styles` - compile the LESS to CSS and copy to *dist*
* `styles:watch` - compile the LESS to CSS, copy to *dist*, and rerun on changes