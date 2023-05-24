//@ts-nocheck

import { fireEvent, render } from "@testing-library/react-native"
import { Error } from "../../views/Error"


describe('error', () => {

    it('renders', () => {
        const routeMock = {
            params: {
                errorMsg: 'Error message'
            }
        }

        const nav = { popToTop: jest.fn()}

        const { getByText, getByTestId } = render(<Error navigation={nav} route={routeMock} />)

        expect(getByTestId('error-msg')).toBeDefined();
        expect(getByTestId('custom-btn-wrapper')).toBeDefined();
        expect(getByText('Ups...')).toBeDefined();
    })

    it('on "ok" btn press', () => {
        const routeMock = {
            params: {
                errorMsg: 'Error message'
            }
        }

        const nav = { popToTop: jest.fn()}

        const { getByTestId } = render(<Error navigation={nav} route={routeMock} />)
        
        fireEvent.press(getByTestId('custom-btn-wrapper'))

        expect(nav.popToTop).toBeCalled();
    })

    it('renders correct error', () => {
        const routeMock = {
            params: {
                errorMsg: 'Error message'
            }
        }

        const nav = { popToTop: jest.fn()}

        const { getByText } = render(<Error navigation={nav} route={routeMock} />)
        
        expect(getByText(routeMock.params.errorMsg)).toBeDefined();

    })
})