/// <reference types="cypress" />

import { grids } from '../../../../lib/dist/vue-screen.esm'
const example = 'extend-grid'
const height = 900
const delay = 100

const grid = {
  ...grids.tailwind,
  xs: '31em',
}

describe(example, () => {
  beforeEach(() => {
    cy.visit(`/${example}/`)
  })

  Object.keys(grid).forEach(breakpoint => {

    let width = parseInt(grid[breakpoint], 10)
    if (typeof grid[breakpoint] === 'string' && grid[breakpoint].includes('em')) {
      width *= 16;
    }

    context(`${breakpoint}`, () => {
      it(`${breakpoint} is true at ${width}px`, () => {
        cy.viewport(width, height)
        cy.wait(delay)
        cy.get(`.${breakpoint}`).should('have.text', 'true')
        cy.get(`.breakpoint`).should('have.text', breakpoint)
      })
    
      it(`${breakpoint} is true above ${width}px`, () => {
        cy.viewport(width + 1, height)
        cy.wait(delay)
        cy.get(`.${breakpoint}`).should('have.text', 'true')
        cy.get(`.breakpoint`).should('have.text', breakpoint)
      })
    
      if (width > 0) {
        it(`${breakpoint} is false below ${width}px`, () => {
          cy.viewport(width - 1, height)
          cy.wait(delay)
          cy.get(`.${breakpoint}`).should('have.text', 'false')
          cy.get(`.breakpoint`).should('not.have.text', breakpoint)
        })
      }
    })

  })

})
