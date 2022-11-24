///  <reference types="cypress" />
describe ('our first test suite',() => {
  it('first test',() => {

      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Form Layouts').click()
      //by tagname
      cy.get('input')
      //by id
      cy.get('#inputEmail')
      //by class name
      cy.get('.input-full-width')
      //by attribute name
      cy.get('[placeholder]')
      //by attribute name and value
      cy.get('[placeholder="Email"]')
      //by class value
      cy.get('[class="input-full-width size-medium shape-rectangle"]')
      //by tagname and attribute with value
      cy.get('input[placeholder="Email"]')
      //by two different attributes
      cy.get('[placeholder="Email"][type="email"]')
      //by tagname,attribute with value,id and class name
      cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
      //the most recommend way by cypress
      cy.get('[data-cy="imputEmail1"]')



  })
//finding web elements
  it('second test',() => {
    cy.visit('/')
    cy.contains('Forms').click()
      cy.contains('Form Layouts').click()
      cy.get('[data-cy="SignInButton"]')
      cy.contains('Sign in')
      cy.contains('[status="warning"]','Sign in')
      cy.get('#inputEmail3')
      .parents('form').find('button')
      .should('contain','Sign in').parents('form')
      .find('nb-checkbox').click()
      cy.contains('nb-card','Horizontal form').find('[type="email"]')


    })
    it('then and wrap',() => {
      cy.visit('/')
      cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //cypress style//jquery find
        cy.contains('nb-card','Using the Grid').then(firstForm => {
          const emailabletext1=firstForm.find('[for="inputEmail1"]').text()
          const passwordlabelfirst=firstForm.find('[for="inputPassword2"]').text()
          expect(emailabletext1).to.equal('Email')
          expect(passwordlabelfirst).to.equal('Password')


        cy.contains('nb-card','Basic form').then(secondForm => {
          const emailabletext2=secondForm.find('[for="exampleInputEmail1"]').text()
          const passwordlabel2=secondForm.find('[for="exampleInputPassword1"]').text()
          expect(emailabletext2).to.equal('Email address')
          expect(passwordlabelfirst).to.equal(passwordlabel2)
          cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
        })

      })
    })
      it('invoke command',() => {
        cy.visit('/')
      cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')
        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
          expect(label.text()).to.equal('Email address')

        })
        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
          expect(text).to.equal('Email address')
        })
        cy.contains('nb-card','Basic form').find('nb-checkbox').click().find('.custom-checkbox').invoke('attr','class')
        .then(classvalue => {
          expect(classvalue).to.contain('checked')
        })

      })
      it.only('Assert property',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card','Common Datepicker').find('input').then(input => {
          cy.wrap(input).click()
          cy.get('nb-calendar-day-picker').contains('24').click()
          cy.wrap(input).invoke('prop','value').should('contain','Nov 24, 2022')
        })
      })





    })

