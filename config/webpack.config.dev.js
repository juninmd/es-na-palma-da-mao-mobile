/* eslint-disable angular/json-functions */
const webpack = require( 'webpack' );
const helpers = require( './helpers' );
const merge = require( 'webpack-merge' ); // used to merge webpack configs
const commonConfig = require( './webpack.config.common' ); // the settings that are common to prod and dev

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag( 'hot' );

const METADATA = merge( commonConfig( { env: ENV }).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = options => {
    return merge( commonConfig( { env: ENV }), {
        /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         */
        devtool: 'cheap-module-source-map',

        /**
         * Options affecting the output of the compilation.
         *
         * See: http://webpack.github.io/docs/configuration.html#output
         */
        output: {

            /**
             * The output directory as absolute path (required).
             *
             * See: http://webpack.github.io/docs/configuration.html#output-path
             */
            path: helpers.root( 'www' ),

            /**
             * Specifies the name of each output file on disk.
             * IMPORTANT: You must not specify an absolute path here!
             *
             * See: http://webpack.github.io/docs/configuration.html#output-filename
             */
            filename: '[name].bundle.js',

            /**
             * The filename of the SourceMaps for the JavaScript files.
             * They are inside the output.path directory.
             *
             * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
             */
            sourceMapFilename: '[name].map',

            /** The filename of non-entry chunks as relative path
             * inside the output.path directory.
             *
             * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
             */
            chunkFilename: '[id].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    loaders: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        plugins: [
            // // Enable multi-pass compilation for enhanced performance
            // // in larger projects. Good default.
            // new webpack.HotModuleReplacementPlugin( {
            //     multiStep: true
            // }),

            new webpack.DllReferencePlugin( {
                manifest: require( helpers.root( 'www/vendors-manifest.json' ) )
            } ),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new webpack.LoaderOptionsPlugin( {
                debug: true,
                options: {

                    /**
                     * Static analysis linter for TypeScript advanced options configuration
                     * Description: An extensible linter for the TypeScript language.
                     *
                     * See: https://github.com/wbuchwalter/tslint-loader
                     */
                    tslint: {
                        emitErrors: false,
                        failOnHint: false,
                        resourcePath: 'src'
                    }
                }
            }),

            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
            new webpack.DefinePlugin( {
                'ENV': JSON.stringify( METADATA.ENV ),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify( METADATA.ENV ),
                    'NODE_ENV': JSON.stringify( METADATA.ENV ),
                    'HMR': METADATA.HMR
                }
            })
        ],

        /**
        * Webpack Development Server configuration
        * Description: The webpack-dev-server is a little node.js Express server.
        * The server emits information about the compilation state to the client,
        * which reacts to those events.
        *
        * See: https://webpack.github.io/docs/webpack-dev-server.html
        */
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            outputPath: helpers.root( 'www/' )
        },

        /*
        * Include polyfills or mocks for various node stuff
        * Description: Node configuration
        *
        * See: https://webpack.github.io/docs/configuration.html#node
        */
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};
