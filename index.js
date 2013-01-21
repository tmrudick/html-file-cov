// module dependencies
var mocha = require('mocha'),
    fs = require('fs'),
    jade = require('jade');

// expore the reporter	
exports = module.exports = HtmlFileCov;
	
// get built-in mocha reporters references
var Base = mocha.reporters.Base,
    JSONCov = mocha.reporters.JSONCov,
    color = Base.color;
	
function HtmlFileCov(runner) {
	var file = __dirname + '/templates/coverage.jade',
		str = fs.readFileSync(file, 'utf8'),
		fn = jade.compile(str, { filename: file }),
		self = this,
		n = 0;
	
	// Call into existing JSONCov reporter to collect results
	JSONCov.call(this, runner, false);
	
	// Display pass/failure indicators
	runner.on('pass', function(test) {
		process.stdout.write(color(test.speed, Base.symbols.dot));
		wrap();
	});
	
	runner.on('fail', function(test) {
		process.stdout.write(color('fail', Base.symbols.dot));
		wrap();
	});
	
	// When the tests end, write out results to coverage.html
	runner.on('end', function() {
		fs.writeFileSync('coverage.html', fn({
			cov: self.cov,
			coverageClass: coverageClass
		}));
		
		// Force \n after mocha exits
		console.log('');
	});
	
	// Wrap output to 80 characters per line
	function wrap() {
		if (++n % 80 === 0) {
			process.stdout.write('\n');
		}
	}
}

function coverageClass(n) {
  if (n >= 75) return 'high';
  if (n >= 50) return 'medium';
  if (n >= 25) return 'low';
  return 'terrible';
}