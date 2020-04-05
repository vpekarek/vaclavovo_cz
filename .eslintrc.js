const INLINE_ELEMENTS = ['a','abbr','audio','b','bdi','bdo','canvas','cite','code','data','del','dfn','em','i','iframe','ins','kbd','label','map',
    'mark','noscript','object','output','picture','q','ruby','s','samp','small','span','strong','sub','sup','svg','time','u','var','video' ];

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/prettier', 'plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    plugins: ['prettier'],
    // watch this for explaining why some of this is here
    // https://www.youtube.com/watch?time_continue=239&v=YIvjKId9m2c
    rules: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'vue/no-unused-components': [
            'error',
            {
                ignoreWhenBindingPresent: true,
            },
        ],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { baseIndent: 1 }],
        'vue/singleline-html-element-content-newline': [
            'error',
            {
                ignoreWhenNoAttributes: true,
                ignoreWhenEmpty: true,
                ignores: ['pre', 'textarea', 'button', 'input', 'router-link', ...INLINE_ELEMENTS],
            },
        ],
        "vetur.format.defaultFormatterOptions": {
            "js-beautify-html": {
                "wrap_attributes": "aligned-multiple"
            },
            "prettyhtml": {
                "printWidth": 400,
                "wrapAttributes": false
            }
        },
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2015,
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
};
