const {
  exec,
  execSync,
  spawn
} = require('child_process')
const readLine = require('readline')

const readSyncByRl = (tips = '>>> ') => new Promise(res => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(tips, answer => {
    rl.close()
    res(answer.trim())
  })
})

const replaceSlot = (cmds, config, splitter) => cmds
  .join(splitter)
  .replace(/\[comments\]/g, ` "${config.comments}" `)
  .replace(/\[branch\]/g, config.branch)
  .split(splitter)

/**
 * commands
 */
const cmds = [
  'git add .',
  'git commit -m [comments]',
  'git pull origin [branch]',
  'git push origin [branch]'
]

/**
 * command line interaction
 */
const inquriy = async () => {
  const comments = await readSyncByRl('Please enter the remark information of this commit： \n')
  const branch = await readSyncByRl('Target remote branch： \n')

  return {
    comments,
    branch
  }
}

/**
 * run command
 */
const runCmd = async cmd => {
  cmd.map(x => execSync(x, {
    stdio: 'inherit'
  }))
}


/**
 * Main
 */
const App = async () => {
  /* 问询参数 */
  const args = await inquriy()
  /* 插入参数 */
  const cmdsSet = await replaceSlot(cmds, args, ',')
  /* 执行命令 */
  const result = await runCmd(cmdsSet)
}


App()
  .catch(e => {
    throw e
  })