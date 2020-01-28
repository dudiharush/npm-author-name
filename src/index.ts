#!/usr/bin/env node
import shell from 'shelljs'
import readGitUsername from 'git-user-name'

function setAuthorName(author: string) {
  shell.exec(`npm config set init-author-name "${author}"`, { silent: true })
}

export function authorName() {
  let author: string | null = ''

  author = shell.exec('npm config get init-author-name', { silent: true }).stdout.trim()
  if (author) return author
  author = readGitUsername()
  if (author) {
    setAuthorName(author)
    return author
  }

  author = shell.exec('npm config get init-author-email', { silent: true }).stdout.trim()
  if (author) return author

  author = shell.exec('git config --global user.email', { silent: true }).stdout.trim()
  if (author) return author

  return author
}
