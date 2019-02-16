/* eslint-disable */
module.exports = {
  package: {
    "name": "",
    "description": "",
    "author": "",
    "version": "0.0.1",
    "license": "MIT",
    "scripts": {
      "copy": "cpx 'src/*.html' './dist'",
      "copy:watch": "cpx 'src/*.html' './dist' --watch",
      "styles": "less-watch-compiler --run-once src dist",
      "styles:watch": "less-watch-compiler src dist",
      "lint": "eslint src",
      "dev": "npm run lint && npm run styles && npm run copy && webpack --mode development",
      "build": "npm run lint && npm run styles && npm run copy && webpack --mode production",
      "watch": "npm run lint && (npm run styles:watch & npm run copy:watch & webpack --mode development --watch)"
    },
    "devDependencies": {
      "babel-core": "^6.26.3",
      "babel-eslint": "^8.2.6",
      "babel-loader": "^7.1.5",
      "babel-preset-env": "^1.7.0",
      "cpx": "^1.5.0",
      "eslint": "^5.2.0",
      "less": "^3.7.1",
      "less-watch-compiler": "^1.11.3",
      "webpack": "^4.16.1",
      "webpack-cli": "^3.1.0",
      "webpack-command": "^0.4.1"  
    }
  },
}