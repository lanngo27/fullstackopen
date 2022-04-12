const user = {
  name: 'Lan Ngo',
  username: 'lanngo',
  password: 'lanngo123'
}

const blog = {
  title: 'Another blog',
  author: 'Cypress',
  likes: 5
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Lan Ngo logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('lanngo1234')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html')
        .should('not.contain', 'Lan Ngo logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login( { username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('A new blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://anewblog.com')

      cy.get('#blog-button').click()

      cy.contains('a new blog A new blog by Cypress added')
      cy.contains('A new blog Cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog(blog)
      })

      it('it can be likes', function() {
        cy.contains(`${blog.title} ${blog.author}`)
          .contains('view')
          .click()

        cy.contains('5')
        cy.contains('like')
          .click()
        cy.contains('6')
      })

      it('user who created a blog can delete it', function() {
        cy.contains(`${blog.title} ${blog.author}`)
          .contains('view')
          .click()

        cy.contains('remove')
          .click()

        cy.contains(`Removed blog ${blog.title}`)
        cy.get('html').should('not.contain', `${blog.title} ${blog.author}`)
      })

      it('another user cannot delete it', function() {
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'newuser',
          password: 'newpass',
          name: 'New User'
        })
        cy.contains('logout')
          .click()
        cy.login({ username: 'newuser', password: 'newpass' })

        cy.contains(`${blog.title} ${blog.author}`)
          .contains('view')
          .click()

        cy.contains('remove').should('not.exist')
      })
    })

    describe('Several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          ...blog,
          title: 'Cypress blog with 10 likes',
          likes: 10
        })
        cy.createBlog({
          ...blog,
          title: 'Cypress blog with 0 likes',
          likes: 0
        })
        cy.createBlog({
          ...blog,
          title: 'Cypress blog with 20 likes',
          likes: 20
        })
      })

      it('they are ordered by number of likes', function() {
        cy.get('.view-button')
          .should('have.length', 3)
          .click({ multiple: true })

        cy.get('.likes')
          .then(function(likes) {
            expect(likes[0]).to.contain(20)
            expect(likes[1]).to.contain(10)
            expect(likes[2]).to.contain(0)
          })
      })
    })
  })
})