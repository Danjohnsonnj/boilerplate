const setup = require('./setup/setup')

;(async () => {
  const answers = await setup.create()

  if (process.argv.includes('full')) {
    setup.init(answers)
  }
})()