export function importScan(code: string) {
  let imports: string[] = []
  let lexer = /(\/\/.*$)|(\/\*)|(?:^[ \t]*import(?: [^\n]+? from)?[ ]+["'`]([^"'`]+)["'`])|(?:(?<=[^\w.$])(?:require|import)\(\s*["'`]([^"'`]+)["'`]\s*\))/gm
  while (true) {
    let match = lexer.exec(code)
    if (!match) return imports

    // Line comment
    if (match[1]) continue

    // Block comment
    if (match[2]) {
      let start = match.index + 2
      while (true) {
        let end = code.indexOf('*/', start)
        if (end < 0) return imports
        if (isEscaped(code, end)) {
          start = end + 1
          continue
        }
        lexer.lastIndex = end + 2
        break
      }
    }

    // Imported path
    else {
      let path = match[3] || match[4]
      if (imports.indexOf(path) < 0) imports.push(path)
    }
  }
}

// Returns true when the given string ends with an unescaped escape.
function isEscaped(str: string, fromIndex: number) {
  let ESCAPE = '\\'.charCodeAt(0),
    i = fromIndex,
    n = 0
  while (i && str.charCodeAt(--i) === ESCAPE) n++
  return n % 2 == 1
}
