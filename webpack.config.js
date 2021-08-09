const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/js/index.js',  
  output: {                              
    path: path.resolve(__dirname, 'dist'),  
    filename: 'bundle.js'              
  },
  plugins: [
    new HtmlWebpackPlugin({     
      filename: 'index.html',  
      template: './src/index.html' 
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
//   module: {
//     rules: [
//       { test: /\.css$/, use: ['style-loader', 'css-loader'] },
//       {
//         test: /\.m?js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         use: [
//             {
//               loader: 'file-loader',
//             },
//           ],
//       },
//       {
//         test: /\.html$/i,
//         loader: "html-loader",
//       },
//     ]
//   },
}

