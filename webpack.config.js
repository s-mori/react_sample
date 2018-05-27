const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 読み込みファイルの指定
  entry: './src/js/app.js',
  // outputファイルを指定(dist/js/bundle.js)
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // ECMAscript2015移行のコードをECMAScript5に変換
          // 拡張子がjsのファイルに対して変換処理を実行
          loader: 'babel-loader',
          options: {
            // Babel実行と同時にReactコードも変換できるようにreactを追加
            presets: ['babel-preset-env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        // style-loader: 動的にstyleタグを生成してCSSを適用
        // css-loader: CSSファイル間の依存関係を解決。style.cssのimport
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  // extract-text-webpack-pluginモジュールをインスタンス化
  plugins: [
    new ExtractTextPlugin('../css/style.css')
  ],
  // 開発サーバの指定
  devServer:
  {
    // ルートディレクトリ
    contentBase: path.join(__dirname, '/'),
    // 画面遷移した際にURLが新たに発行される
    historyApiFallback: true,
    port: 3000
  },
};
