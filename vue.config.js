module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888', // target host
                ws: true, // proxy websockets
                changeOrigin: true, // needed for virtual hosted sites
            },
        },
    },
};
