
module.exports = {
 testEnvironment: 'node',
 setupFilesAfterEnv: ['./__tests__/setup.js'],
 globalTeardown: './__tests__/teardown.js',
};
