const { reverseValue, getNumberOfTeamMembers, redirectIfFalse, emailNewTeamMember, checkNewMemberIsAdmin } = require("./../christianLogic/christianLogic")

test(
  "toggle should return the opposite value",
  () => {
    expect(reverseValue(true)).toBe(false)
  }
)

test(
  "should return false (boolean) if argument is false (boolean)", () => {
    expect(redirectIfFalse(false)).toEqual(false)
  }
)

test(
  "should return true (boolean) if argument is 'true' (string)", () => {
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
    "axios call should return an array", () => {
      expect(getNumberOfTeamMembers(2)).resolves.toBe([])
    }
  )
})