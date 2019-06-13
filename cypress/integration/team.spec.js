describe('test#1 Shawn-1', () => {
  it('Visits the Landing Page', () => {
    cy.visit("http://localhost:3000/#/landing")
  })
})
describe('test#2 Shawn-2', () => {
  it('click on register button', () => {
    cy.get('.select-register-btn').click()
    cy.url().should('include', '/register')
  })
})
describe('test#3 Shawn-3', () => {
  it('inputs first name', () => {
    const first = 'Colton'
    cy.get('#firstname')
      // .first()
      .should('exist')
      .type(first)
  })
})
describe('test#4 Shawn-4', () => {
  it('inputs last name', () => {
    const last = 'Freeze'
    cy.get('#lastname')
      // .first()
      .should('exist')
      .type(last)
  })
})
describe('test#5 Shawn-5', () => {
  it('inputs email', () => {
    const email = 'frozeninwaiting@live.com'
    cy.get('#email')
      // .first()
      .should('exist')
      .type(email)
  })
})
describe('test#6 Jackson-1', () => {
  const password = '123'
  it('inputs password', () => {
    cy.get('#password')
      // .first()
      .should('exist')
      .type(password)
  })
})
describe('test#7 Jackson-2', () => {
  const company = '7-11'
  it('inputs company name', () => {
    cy.get('#company')
      // .first()
      .should('exist')
      .type(company)
  })
})
describe('test#8 Jackson-3', () => {
  const city = 'Provo'
  it('inputs city', () => {
    cy.get('#city')
      // .first()
      .should('exist')
      .type(city)
  })
})
describe('test#9 Jackson-4', () => {
  const state = 'Utah'
  it('inputs state', () => {
    cy.get('#state')
      // .first()
      .should('exist')
      .type(state)
  })
})
describe('test#10 Jackson-5', () => {
  it('Finds Company', () => {
    cy.get('.find-co-btn').click()
  })
})
describe('test#11 Colton-1', () => {
  it('Selects First Company Listed', () => {
    cy.get('.companyBoxDisplayed')
      .first()
      .click()
  })
})
// describe('test#12 Colton', () => {
//   it('after all inputs this clicks the register button', () => {
//     cy.get('.register-co-btn').click()
//   })
// })
describe("test#12 Colton-2", () => {
  it("Visit the Landing Page", () => {
    cy.visit("http://localhost:3000/#/landing")
  })
})
describe("test#13 Colton-3", () => {
  it("Click on Login button and go to the login page", () => {
    cy.get(".select-login-btn").click()
    cy.url().should('include', '/login')
  })
})
describe("test#14 Colton-4", () => {
  it("inputs email", () => {
    const email = 'frozeninwaiting@live.com'
    cy.get(".login-email")
      .should("exist")
      .type(email)
  })
})
describe("test#15 Colton-5", () => {
  it("Enter a password", () => {
    const login_password = '123'
    cy.get(".login-password")
      .should("exist")
      .type(login_password)
  })
})
describe("test#16 Christian-1", () => {
  it("Clicks Login", () => {
    cy.get(".login-btn").should("exist").click()
    cy.url().should('include', '/')
  })
})
describe('test#17 Christian-2', () => {
  it('click on ham menu', () => {
    cy.get('.fa-bars').should("exist").click()
  })
})
describe('test#18 Christian-3', () => {
  it('clicks on team member link', () => {
    cy.get(".team-member-link").click()
    cy.url().should('include', '/team-members')
  })
})
describe('test#19 Christian-4', () => {
  it('click on Add New Team Member', () => {
    cy.get('.add-new-team-member-btn').click()
  })
})
describe('test#20 Christian-5', () => {
  it('inputs first name on team members', () => {
    const team_member_first_name = 'Bob'
    cy.get('.new-firstname')
      .first()
      .should('exist')
      .type(team_member_first_name)
  })
})
describe('test#21', () => {
  it('inputs last name on team members', () => {
    const team_member_last_name = 'Robert'
    cy.get('.new-lastname')
      .first()
      .should('exist')
      .type(team_member_last_name)
  })
})
describe('test#22', () => {
  it('inputs email on team members', () => {
    const team_member_email = 'Bob@robert.com'
    cy.get('.new-email')
      .first()
      .should('exist')
      .type(team_member_email)
  })
})
