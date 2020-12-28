const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "./main.js"),
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, "./dist"),
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 666,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/",
                            pubilcPath: ""
                        }
                    }
                ]
            }
        ]
    }
}