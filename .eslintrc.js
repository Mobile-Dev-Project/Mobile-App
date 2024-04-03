module.exports = {
        root: true,
        extends: ['@react-native-community'],
        // Your custom rules here
        rules: {
        'prettier/prettier': 'error',
        },
        plugins: ['prettier'],
        extends: [
        'plugin:prettier/recommended',
        ],
    };  