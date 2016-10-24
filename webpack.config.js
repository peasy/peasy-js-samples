module.exports = {
  // entry is the "main" source file we want to include/import
  entry: "./client/index.js",
  // output tells webpack where to put the bundle it creates
  output: {
    // in the case of a "plain global browser library", this
    // will be used as the reference to our module that is
    // hung off of the window object.
    library: "ordersDotCom",
    // We want webpack to build a UMD wrapper for our module
    libraryTarget: "umd",
    // the destination file name
    filename: "public/js/ordersdotcom.js"
    // filename: "lib/orders.js"
  },
  externals: [
    {
      'peasy-js': {
        root: "peasy",
        commonjs: "peasy-js",
        commonjs2: "peasy-js",
        amd: "peasy-js"
      }
    },
    {
      lodash: {
        root: "_",
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash"
      }
    }
  ],
  module: {
    loaders: [
      // babel loader, testing for files that have a .js extension
      // (except for files in our node_modules folder!).
      {
        test: /\.js$/,
         exclude: /node_modules/,
         loader: "babel-loader",
         query: {
           compact: false // because I want readable output
         }
      }
    ]
  }
};
