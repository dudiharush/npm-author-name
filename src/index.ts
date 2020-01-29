import shell from 'shelljs'
import readGitUsername from 'git-user-name'

export function setAuthorName(author: string) {
  shell.exec(`npm config set init.author.name "${author}"`, { silent: true })
}

export function getAuthorName() {
  let author: string | null = ''

  author = shell.exec('npm config get init.author.name', { silent: true }).stdout.trim()
  if (author) return author
  author = readGitUsername()
  if (author) {
    setAuthorName(author)
    return author
  }
}
