// const { reverseValue } = require("./../christianLogic/christianLogic")
const { reverseValue, getTeamMembers } = require("./../christianLogic/christianLogic")

test(
  "toggle should return the opposite value",
  () => {
    expect(reverseValue(true)).toBe(false)
  }
)

test(
  "should return an array of employees assoc to a specific company_id",
  () => {
    expect(getTeamMembers(2)).resolves.toBe([])
  }
)