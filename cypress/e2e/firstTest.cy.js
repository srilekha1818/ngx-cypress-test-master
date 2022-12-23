///  <reference types="cypress" />

const { transferableAbortSignal } = require("util")

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
      it('Assert property',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card','Common Datepicker').find('input').then(input => {
          cy.wrap(input).click()
          cy.get('nb-calendar-day-picker').contains('24').click()
          cy.wrap(input).invoke('prop','value').should('contain','Dec 24, 2022')
        })
      })
      it('radio button',() => {
        cy.visit('/')
      cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons => {
          cy.wrap(radioButtons)
        .first()
      .check({force:true})
    .should('be.checked')
    cy.wrap(radioButtons)
    .eq(1)
    .check({force:true})
    cy.wrap(radioButtons)
    .first()
    .should('not.be.checked')
    cy.wrap(radioButtons)
    .eq(2)
    .should('be.disabled')

  })

      })

it('checkboxes',() => {
  cy.visit('/')
      cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
        //cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})


})
it('lists and dropdowns',() => {
  cy.visit('/')
      cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
       cy.get('nav nb-select' ).should('contain','Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color','rgb(34, 43, 69)')

        //2
        cy.get('nav nb-select').then(dropdown => {
          cy.wrap(dropdown).click()
          cy.get('.options-list nb-option').each((listItem,index) => {
            const itemText=listItem.text().trim()
            const colors=
            {
              "Light":"rgb(255, 255, 255)",
              "Dark":"rgb(34, 43, 69)",
              "Cosmic":"rgb(50, 50, 89)",
              "Corporate":"rgb(255, 255, 255)"
            }
            cy.wrap(listItem).click()
            cy.wrap(dropdown).should('contain',itemText)
            cy.get('nb-layout-header nav').should('have.css', 'background-color',colors[itemText])

            if(index<3){
              cy.wrap(dropdown).click()

            }


          })

        })
})

it('web tables',() => {
  cy.visit('/')
  cy.contains('Tables & Data').click()
  cy.contains('Smart Table').click()
  //1
  cy.get('tbody').contains('tr','Larry').then(tableRow => {
    cy.wrap(tableRow).find('.nb-edit').click()
    cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
    cy.wrap(tableRow).find('.nb-checkmark').click()
    cy.wrap(tableRow).find('td').eq(6).should('contain','25')
  })
  //2
cy.get('thead').find('.nb-plus').click()
cy.get('thead').find('tr').eq(2).then(tableRow => {
  cy.wrap(tableRow).find('[placeholder="First Name"]').type('sri')
  cy.wrap(tableRow).find('[placeholder="Last Name"]').type('lekha')
  cy.wrap(tableRow).find('.nb-checkmark').click()
})
cy.get('tbody tr').first().find('td').then(tablecolumns => {
  cy.wrap(tablecolumns).eq(2).should('contain','sri')
  cy.wrap(tablecolumns).eq(3).should('contain','lekha')
})
//3
const age=[20,30,40,200]
cy.wrap(age).each(age => {
  cy.get('thead [placeholder="Age"]').clear().type(age)
  cy.wait(500)
  cy.get('tbody tr').each(tableRow => {
    if(age==200){
      cy.wrap(tableRow).should('contain','No data found')
    }
    else{
      cy.wrap(tableRow).find('td').eq(6).should('contain',age)
    }
  })
})

})
it('assert property',() => {
  function selectDayFromCurrent(day){
    let date=new Date()
    date.setDate(date.getDate()+day)
    let futureDay=date.getDate()
    let futureMonth=date.toLocaleString('default',{
      month:'short'
    })
    let dateAssert=futureMonth+' '+futureDay+','+' '+date.getFullYear()
    cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then(dateAttribute =>
      {
        if(!dateAttribute.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click()
          selectDayFromCurrent()
        }
        else{
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }


    })
    return dateAssert
  }
  cy.visit('/')
  cy.contains('Forms').click()
  cy.contains('Datepicker').click()
  cy.contains('nb-card','Common Datepicker').find('input').then(input => {
    cy.wrap(input).click()
    let dateAssert=selectDayFromCurrent(3)
    cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
  })
})
it('tooltip',() =>{
  cy.visit('/')
      cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
        cy.contains('nb-card','Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain','This is a tooltip')
})
it('dialog box',() => {
  cy.visit('/')
      cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //1
        //cy.get('tbody tr').first().find('.nb-trash').click()
        //cy.on('window:confirm',(confirm) =>{
        //  expect(confirm).to.equal('Are you sure you want to delete?')
       // })
       //2
       //const stub=cy.stub()
       //cy.on('window:confirm',stub)
       //cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
       // expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
       //})
       //3
       cy.get('tbody tr').first().find('.nb-trash').click()
       cy.on('window:confirm',() => false)

})



    })

