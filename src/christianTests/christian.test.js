const { reverseValue, getNumberOfTeamMembers, redirectIfFalse, emailNewTeamMember, checkNewMemberIsAdmin } = require("./../christianLogic/christianLogic")

test(
  "toggle should return the opposite value",
  () => {
    expect(reverseValue(true)).toBe(false)
  }
)

test(
  "should return false if value is false", () => {
    expect(redirectIfFalse(false)).toEqual(false)
  }
)

test(
  "should return a boolean of true if argument is 'true'", () => {
    expect(checkNewMemberIsAdmin("true")).toEqual(true)
  }
)

describe("Axios calls", () => {
  test(
    "axios call should return a string", () => {
      expect(emailNewTeamMember(999, "Christian", "ca96187@gmail.com")).resolves.toBe("")
    }
  )
  test(
    "should return truthy", () => {
      expect(getNumberOfTeamMembers(2)).toBeTruthy()
    }
  )
})