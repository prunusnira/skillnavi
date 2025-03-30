module.exports = {
    devServer: {
        port: 3002,
    },
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.output.publicPath =
                process.env.ENV === 'dev' ? '' : 'https://sinupdater.nira.one/';
            webpackConfig.module.rules.push({
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            });
            return webpackConfig;
        },
    },
};
