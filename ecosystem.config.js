module.exports = {
  name: 'TFG-API',

  // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/

  script: './src/index.ts',
  interpreter: 'node',
  interpreter_args: '--import tsx',
  watch: true,
  exec_mode: 'cluster',
  instances: 'max'
}