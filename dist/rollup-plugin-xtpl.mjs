import 'xtemplate';
import { createFilter } from 'rollup-pluginutils';
import path from 'path';

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
	const filter = createFilter(options.include || ['**/*.xtpl'], options.exclude || 'node_modules/**');
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

export default xtpl;