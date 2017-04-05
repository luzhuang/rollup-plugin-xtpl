'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var xtemplate = require('xtemplate');
var rollupPluginutils = require('rollup-pluginutils');
var path = _interopDefault(require('path'));

let fileCount = 0;

function normalizePath(id) {
	return path.relative(process.cwd(), id).split(path.sep).join('/');
}
function compile(code) {
	let newCode = `import Xtemplate from "xtemplate";`;
	newCode += `export default new Xtemplate("${code}")\n`;
	console.log(newCode);
	return newCode;
}

function xtpl(options = {}) {
	const filter = rollupPluginutils.createFilter(options.include || ['**/*.xtpl'], options.exclude || 'node_modules/**');
	return {
		name: 'xtpl',
		transform(code, id) {
			const file = normalizePath(id);
			if (!filter(id)) {
				return null;
			}
			fileCount++;
			return {
				code: compile(code),
				map: { mappings: '' }
			};
		}
	};
}

module.exports = xtpl;