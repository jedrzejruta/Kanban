/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const config = {
	devServer: {
		publicPath: 'dist',
		contentBase: path.resolve(__dirname, 'dist'),
		watchContentBase: true
	},
	mode: 'development',
	entry: {
		'main': './src/main.ts',
		'client': './src/client.ts'
	},	
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.scss'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.tsx?$/,
				use: 'eslint-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',  //outputs style.scsc as .css file to dist
						options: 
						{
							outputPath: './',
							name: '[name].css'
						}
					},
					/*
					uncomment to change building as inserting to head style
					*/
					// Creates `style` nodes from JS strings
					// 'style-loader',
					// Translates CSS into CommonJS
					// 'css-loader',
					// Compiles Sass to CSS
					'sass-loader',	
				],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
		],
	},
};

const serverConfig = {
	entry: {
		'server': './src/server.ts'
	},
	mode: 'development',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
		],
	},
	externals: ['bufferutil', 'utf-8-validate'],
	resolve: {
		extensions: [ '.tsx', '.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	}
};
module.exports = [config, serverConfig];