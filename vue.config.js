module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',

    // // disable hashes in filenames
    // filenameHashing: false,
    // // delete HTML related webpack plugins
    // chainWebpack: config => {
    //     config.plugins.delete('html')
    //     config.plugins.delete('preload')
    //     config.plugins.delete('prefetch')
    // },

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
        }
    },

    // // path relative to this project, where the result files will be presented
    // outputDir: 'wwwroot/profil-edit',

    // // path used in src/href attributes to load the static files.
    // baseUrl: 'wwwroot/profil-edit',
};
