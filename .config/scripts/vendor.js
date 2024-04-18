const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const vendor = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './.config/vendor/scripts/',
          to: './gutenverse-news/assets/js/', 
        },
      ],
    }),
  ],
};


module.exports = {
	vendor,
};
