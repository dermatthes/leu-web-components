const path = require('path');


module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.resolve(__dirname, "src"),

            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],

    },
    devtool: 'source-map',
    mode: "development",

    plugins: [

    ],
    devServer: {
        port: 4000,
        liveReload: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            serveIndex: true,
            watch: true
        },
    },
    output: {
        filename: 'leu-web-components.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
