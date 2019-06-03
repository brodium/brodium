const { reverseValue } = require("./../christianLogic/christianLogic")

test(
  "toggle should return the opposite value",
  () => {
    expect(reverseValue(true)).toBe(false)
  }
)