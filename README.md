html-file-cov
=============

About
-------------
A Mocha reporter which outputs JavaScript code coverage information directly into an HTML file. Works exactly like the built in html-cov reporter except writes to a file instead of stdout. 

Also outputs dot-style test pass/failures to stdout. Useful to see the progress of long-running test suites.

Installation
-------------
```
npm install html-file-cov
```

Usage
-------------
html-file-cov is to be used with [mocha](https://github.com/visionmedia/mocha) and code coverage tools such as [node-jscoverage](https://github.com/visionmedia/node-jscoverage) or [blanket](https://github.com/Migrii/blanket). 

```
mocha testrunner.js -R html-file-cov
```

Results will be saved into a file named coverage.html file within the current working directory.