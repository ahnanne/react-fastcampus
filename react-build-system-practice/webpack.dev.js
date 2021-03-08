// node.js
const path = require('path');

const getAbsolutePath = dirPath => path.resolve(__dirname, dirPath);

// CommonJS 진영의 내보내기
module.exports = {
  // bundle mode
  mode: 'development',
  // entry(진입)
  entry: {
    main: './src/index.js',
  },
  // 출력 설정
  output: {
    // path(경로)
    path: getAbsolutePath('public'),
    // filename -> chunck name(main entry의 이름값)이 [name]으로 들어감.
    filename: 'js/[name].js',
    publicPath: '/',
    // publicPath - 공용 디렉토리(모든 asset의 기본 위치)
  },
  // module(규칙) - 로더 객체
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // 이미지 포멧: PNG, JP(E)G, GIF, SVG, WEBP
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: ['file-loader'],
      },
      // CSS 파일 로더 설정
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Sass 파일 로더 설정
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // dev server 설정
  devServer: {
    // 공식 문서에는 반드시 absolute server(절대경로) 쓰라고 되어있음.
    contentBase: getAbsolutePath('public'),
    index: 'index.html',
    port: 9000,
    hot: true,
  },
};
