const mix = require('laravel-mix');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
	output: {
		chunkFilename: 'js/[name].js',
	},
	// output: {
	//     chunkFilename: "js/[name].[contenthash].js",
	//     filename: "[name].[contenthash].js"
	// },
	plugins: [
		// new BundleAnalyzerPlugin(),
		// new webpack.ContextReplacementPlugin(
		// 	/moment[\/\\]locale/,
		// 	// A regular expression matching files that should be included
		// 	/(vi)\.js/
		// ),
	],
})
	.ts('resources/js/index.tsx', 'public/js')
	.react()
	.sass('resources/sass/app.scss', 'public/css');
// .less('resources/sass/custom-antd.less', 'public/css/antd.css', {
// 	lessOptions: {
// 		modifyVars: {
// 			'primary-color': '#518F3C',
// 			'link-color': '#518F3C',

// 			// "primary-color": "#1890ff", // primary color for all components
// 			// "link-color": "#1890ff", // link color
// 			// "success-color": "#52c41a", // success state color
// 			// "warning-color": "#faad14", // warning state color
// 			// "error-color": "#f5222d", // error state color
// 			'font-size-base': '14px', // major text font size
// 			// "heading-color": "rgba(0, 0, 0, 0.85)", // heading text color
// 			// "text-color": "rgba(0, 0, 0, 0.65)", // major text color
// 			// "text-color-secondary": "rgba(0, 0, 0, 0.45)", // secondary text color
// 			// "disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
// 			// 			@border-color-base: #d9d9d9; // major border color
// 			'box-shadow-base':
// 				'0 1.3px 2.2px rgb(56 110 38 / 20%), 0 4.5px 6.5px rgb(36 70 25 / 18%), 4px 15px 19px rgb(35 60 26 / 15%)', // major shadow for layers
// 			'border-radius-base': '2px', // major border radius
// 		},
// 		javascriptEnabled: true,
// 	},
// });

mix.disableNotifications();
