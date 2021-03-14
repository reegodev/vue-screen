/// <reference types="cypress" />

const example = 'screen-properties'
const delay = 100

const viewports = [
  {
    preset: 'ipad-2',
    width: 768,
    height: 1024,
    orientation: 'portrait',
  },
  {
    preset: 'iphone-x',
    width: 375,
    height: 812,
    orientation: 'portrait',
  },
  {
    preset: 'iphone-x',
    width: 812,
    height: 375,
    orientation: 'landscape',
  },
  {
    preset: 'samsung-s10',
    width: 360,
    height: 760,
    orientation: 'portrait',
  },
  {
    preset: 'samsung-s10',
    width: 760,
    height: 360,
    orientation: 'landscape',
  },
]

describe(example, () => {
  beforeEach(() => {
    cy.visit(`/${example}`)
  })

  viewports.forEach((viewport) => {
    context(`${viewport.preset} - ${viewport.orientation}`, () => {
      const { width, height } = viewport
    
      beforeEach(() => {
        cy.viewport(viewport.preset, viewport.orientation)
        cy.wait(delay)
      })

      it(`width is ${width}`, () => {
        cy.get(`.width`).should('have.text', width)
      })

      it(`height is ${height}`, () => {
        cy.get(`.height`).should('have.text', height)
      })

      it(`resolution is ${width}x${height}`, () => {
        cy.get(`.resolution`).should('have.text', `${width}x${height}`)
      })

      it(`orientation is ${viewport.orientation}`, () => {
        cy.get(`.orientation`).should('have.text', `${viewport.orientation}`)
      })

      it(`portrait is ${viewport.orientation === 'portrait' ? 'true' : 'false'}`, () => {
        cy.get(`.portrait`).should('have.text', `${viewport.orientation === 'portrait' ? 'true' : 'false'}`)
      })

      it(`landscape is ${viewport.orientation === 'landscape' ? 'true' : 'false'}`, () => {
        cy.get(`.landscape`).should('have.text', `${viewport.orientation === 'landscape' ? 'true' : 'false'}`)
      })

    })
  })

})
