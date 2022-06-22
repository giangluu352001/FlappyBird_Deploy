const path = require('path');

module.exports = {
    entry: './src/game.ts',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.ts$/,
                include: path.resolve(__dirname, 'src'),
                use: 'ts-loader'
            },
            {
                test: require.resolve('Phaser'),
                loader: 'expose-loader',
                options: { exposes: { globalName: 'Phaser', override: true } }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: './dist',
    }
};