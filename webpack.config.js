const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// В каком режиме мы собираем проект
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// console.log('IS PROD:', isProd)
// console.log('IS DEV:', isDev)

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
    const loaders = [
      {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),    // отвечает за то, где лежат все исходники в нашем приложении
    mode: 'development',  // webpack в режиме разработки
    entry: ['@babel/polyfill', './index.js'],   //указываем входные точки для приложения, добавляем полифил для работы async/await
    output: {
        filename: filename('js'),  //здесь находятся все наши js скрипты
        path: path.resolve(__dirname, 'dist')  // тут будет хранится созданый проект
    },
    resolve: {
        extensions: ['.js'],  // расширения по умолчанию
        alias: {  //изменять путь файла -> import '../../../../core/Component' на import '@core/Component'
        '@': path.resolve(__dirname, 'src'), //когда пишем символ @ -> сразу переходим в src и уже от неё идём
        '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,  //source-map - позволяет держать prod максимально сжатым, но при этом позволяет его отлаживать
    devServer: {     //  перезагрузка в реальном времени
        port: 3000,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),  //чистит папку dist
        new HTMLWebpackPlugin({
            template: 'index.html',  //откуда берём шаблон для html, чтобы плагин самостоятельно его не генерировал
            minify: {
                removeComments: isProd,      //удаление комментов если это production
                collapseWhitespace: isProd  //удаление пробелов если это production
            }
        }),
        new CopyPlugin({  // чтобы переносить favicon
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({  //выносить css из js в отдельный файл
            filename: filename('css')    //в какой файл необходимо это всё поместить
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,  //расширение sass/scss
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { //авто перезагрузка страницы
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',  // 2-ой компилится через css
                    'sass-loader'  // 1-ый компилится через scss/sass
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    }
}
