module.exports = {
    entry: "./src/App.jsx",
    output: {
        path: "./build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            {include: /\.json$/, loader: 'json-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    }
};