import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'

describe('Page', () => {
  it('renders HomePage', () => {
    render(<Page />)

    const homePage = screen.getByTestId('home-page')
    expect(homePage).toBeInTheDocument()

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
