export default function sortRoutes (a, b) {
  const pathnameA = a.pathname
  const pathnameB = b.pathname

  if (pathnameA === pathnameB) return 0
  if (pathnameA === '*') return 1
  if (pathnameB === '*') return -1

  const tokensA = a.tokens
  const tokensB = b.tokens
  let result = 0

  for (let i = 0, ln = Math.min(tokensA.length, tokensB.length); i < ln; i += 1) {
    const tokenA = tokensA[i]
    const tokenB = tokensB[i]

    if (typeof tokenA === 'string' && typeof tokenB === 'string') {
      result = tokenA.localeCompare(tokenB)
    } else if (typeof tokenA === 'string') {
      result = -1
    } else if (typeof tokenB === 'string') {
      result = 1
    } else {
      result = String(tokenA.name).localeCompare(String(tokenB.name))
    }

    if (result !== 0) break
  }

  result = result !== 0 ? result : (tokensA.length - tokensB.length)

  return result
}
