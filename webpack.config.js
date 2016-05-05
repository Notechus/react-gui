module.exports = {
    entry: "./src/scripts/App.jsx",
    output: {
        path: "./build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};