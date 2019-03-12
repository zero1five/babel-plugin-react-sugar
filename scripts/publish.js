const shell = require('shelljs')
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const run = (command, options) => {
  const continueOnErrors = options && options.continueOnErrors
  const ret = shell.exec(command, options)
  if (!continueOnErrors && ret.code !== 0) {
    shell.exit(1)
  }
  return ret
}

const exit = (code, msg) => {
  console.error(msg)
  shell.exit(code)
}

const prompt = async (question, defaultValue) => {
  return new Promise(resolve => {
    rl.question(`${question} [${defaultValue}]： `, answer => {
      answer = answer && answer.trim()
      resolve(answer ? answer : defaultValue)
    })
  })
}

const App = async () => {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))

  let nrs = pkg.version.split(".")
  nrs[2] = 1 + parseInt(nrs[2], 10)

  const version = (pkg.version = await prompt(
    "Please specify the new package version of '" + pkg.name + "' (Ctrl^C to abort)",
    nrs.join(".")
  ))

  if (!version.match(/^\d+\.\d+\.\d+$/)) {
    exit(1, "Invalid semantic version: " + version)
  }

  if (
    shell
    .exec('npm config get registry')
    .stdout.indexOf('https://registry.npmjs.org/') === -1
  ) {
    exit(1, "check npm registry is official source")
  }

  const npmInfoRet = run(`npm info ${pkg.name} --json`, {
    continueOnErrors: true,
    silent: true
  })

  if (npmInfoRet.code === 0) {
    var publishedPackageInfo = JSON.parse(npmInfoRet.stdout)
    if (
      publishedPackageInfo.versions == version ||
      publishedPackageInfo.versions.includes(version)
    ) {
      exit(2, "Version " + pkg.version + " is already published to npm")
    }

    fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2), "utf8")

    run("npm publish")

    run("git add .")
    run(`git commit -am "npm: Published version ${version}"`)
    run(`git tag ${version}`)

    run("git push")
    run("git push --tags")
    console.log("Published!")
    exit(0)
  } else {
    exit(1, pkg.name + " is not an existing npm package")
  }
}

App()
  .catch(e => {
    throw e
  })