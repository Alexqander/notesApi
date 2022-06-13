const { palindrome } = require('../utils/for_testing')

test('palindrome of alexander', () => {
  const result = palindrome('alexander')

  expect(result).toBe('rednaxela')
})
