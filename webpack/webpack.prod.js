process.env.NODE_ENV = 'production';
const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

console.log(process.env.NODE_ENV);

const templateFileMapper = [

    { template: "./src/index.ejs", file: "index.html" },
    { template: "./src/collections.ejs", file: "collections.html" },
    { template: "./src/products.ejs", file: "products.html" },
    { template: "./src/product-details.ejs", file: "product-details.html" },
]



const htmlPlugins = () => {
  return templateFileMapper.map(entry => {
    return new HtmlWebpackPlugin({
      template: entry.template,
      filename: entry.file,
      minify: {
        removeScriptTypeAttributes: true,
      }
    });
  })
};


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    
    entry: {
        'app.js': [
          path.resolve(__dirname, '../src/app.js')
        ]
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name]",
        publicPath: ''
    },

    module: {
    	rules: [
			loaders.css,
			loaders.scss,
            loaders.fonts,
            loaders.images,
            loaders.js,
            loaders.ejs
        ]
    },
    
    plugins: htmlPlugins().concat([
        new ProgressBarPlugin(),
        
        plugins.MiniCssExtractPlugin,

        createHappyPlugin('scss', ['css-loader?importLoaders:1!postcss-loader?sourceMap:1!sass-loader']),
        
        plugins.js,

    ]),
	
	optimization: {
	    minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false
              }
            }
          })
        ],
	    minimize: false,
        namedModules: true, // NamedModulesPlugin()
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        concatenateModules: true //ModuleConcatenationPlugin
    }
};


function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        verbose: false,
    });
}

