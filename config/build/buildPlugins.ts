import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import type { WebpackPluginInstance } from 'webpack'
import type { BuildOptions } from './types/config'

export function buildPlugins({ paths, isDev }: BuildOptions): WebpackPluginInstance[] {
	const isProd = !isDev

	const plugins = [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev)
		})
	]

	if (isDev) {
		plugins.push(new ReactRefreshWebpackPlugin())
		plugins.push(new webpack.HotModuleReplacementPlugin())
	}

	if (isProd) {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}))
	}

	return plugins
}
