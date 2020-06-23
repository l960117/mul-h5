const path = require('path')
const glob = require('glob');

module.exports = function(globPath) {

	let entries = {},
		basename,
		tmp,
		pathname;
	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		basename = basename.split('.m')[0];
		tmp = entry.split('/').splice(-3);
		pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
		entries[pathname] = entry;
	});

	return entries;
}