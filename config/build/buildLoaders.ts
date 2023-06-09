import type { RuleSetRule } from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack']
	}
	const babelLoader = {
		test: /\.(js|jsx|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	}

	const cssLoader = buildCssLoader(isDev)

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: [{
			loader: 'ts-loader',
			options: {
				transpileOnly: true
			}
		}],
		exclude: /node_modules/
	}

	return [
		svgLoader,
		babelLoader,
		typescriptLoader,
		cssLoader
	]
}
