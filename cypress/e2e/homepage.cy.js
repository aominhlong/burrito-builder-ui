describe('Burrito Builder', () => {
    beforeEach(() => {
        cy.intercept('GET','http://localhost:3001/api/v1/orders', { fixture: 'orders.json' })
        cy.visit('http://localhost:3000')
    })

    it('should have a title and ingredient buttons', () => {
        cy.get('h1').contains('Burrito Builder')
        cy.get('[name="beans"]').contains('beans')
        cy.get('[name="pico de gallo"]').contains('pico de gallo')
        cy.get('[name="cilantro"]').contains('cilantro')
    })

    it('should be able to see all orders', () => {
        cy.get('section').children().should('have.length', 3)
        cy.get('section > :nth-child(1)').contains('Pat')
        cy.get('section > :nth-child(2)').contains('Sam')
        cy.get('section > :nth-child(3)').contains('Alex')
    })

    it('should start with no ingredients selected', () => {
        cy.get('.order').contains('Nothing selected')
    })

    it('should be able to choose ingredients', () => {
        cy.get('[name="beans"]').click()
        cy.get('[name="pico de gallo"]').click()
        cy.get('[name="cilantro"]').click()

        cy.get('form > .order').contains('beans, pico de gallo, cilantro')
    })

    it('should be able to see what is typed in the input field', () => {
        cy.get('input').type('Ni')
        cy.get('input').should('have.value', 'Ni')
    })

    it('should be able to make a burrito after typing a name, choosing an ingredient, and hitting submit order', () => {

        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: 'sendOrder.json' })

        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', { fixture: 'refetch.json' })

        cy.get('input').type('Nick')

        cy.get('[name="steak"]').click()
        cy.get('[name="pico de gallo"]').click()
        cy.get('[name="jalapenos"]').click()

        cy.get('.submit-btn').click()

        cy.get('section').children().should('have.length', 4)
    })

    it('should get a message if the order does not have a name', () => {
        cy.get('[name="steak"]').click()
        cy.get('[name="pico de gallo"]').click()
        cy.get('[name="jalapenos"]').click()

        cy.get('.submit-btn').click()

        cy.get('.error-message').contains('Please make sure to have a name and at least one ingredient for your order')
    })

    it('should get a message if the order does not have at least one item selected name', () => {
        cy.get('input').type('Nick')

        cy.get('.submit-btn').click()

        cy.get('.error-message').contains('Please make sure to have a name and at least one ingredient for your order')
    })

    it('should be able to delete an order', () => { 
        cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders', { fixture: 'deletefixture.json' })
       
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', { fixture: 'refetch-after-delete.json' })
        
        cy.get('section').children().should('have.length', 3)

        cy.get('.delete-3').click()

        cy.get('section > :nth-child(1)').contains('Pat')
        cy.get('section > :nth-child(2)').contains('Sam')

        cy.get('section').children().should('have.length', 2)
    })
})