var assert = require( 'assert' )
var rollup = require( 'rollup' )
var xtpl = require( '../dist/rollup-plugin-xtpl.js' )
process.chdir( __dirname );

describe( 'rollup-plugin-xtpl', function () {
    it( 'converts xtpl', function () {
        return rollup.rollup({
            entry: './sample/main.js',
            targets: [
                {
                    format: 'cjs',
                    dest: './bundle.js'
                }
            ],
            plugins: [ xtpl() ]
        }).then((bundle) => {
            console.log(444, bundle)
            bundle.write({
                dest: './dist.cjs.js',
            });
       });
    });
});
