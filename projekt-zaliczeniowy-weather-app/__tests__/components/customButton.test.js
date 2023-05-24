
import { CustomButton } from "../../components/CustomButton"
import { render, fireEvent } from '@testing-library/react-native';
import { colors } from "../../constants";



describe('custom button', () => {
    it('render', () => {
        const title = 'button test'
        const { getByTestId, debug } = render(<CustomButton title={title} />)

        expect(getByTestId('custom-btn-text')).toBeDefined();
        expect(getByTestId('custom-btn-wrapper')).toBeDefined();
    })

    it('displays correct title', () => {
        const title = 'button test'
        const {getByText} = render(<CustomButton title={title} />)

        expect(getByText(title).children.at(0)).toBe(title)
    })

    it('on press', () => {

        const mockOnPress = jest.fn();
        const title = 'button test'

        const { getByTestId } = render(<CustomButton title={title} onPress={mockOnPress} />)
        fireEvent.press(getByTestId('custom-btn-wrapper'))

        expect(mockOnPress).toHaveBeenCalled()
    })

    it('on multiple press', () => {

        const mockOnPress = jest.fn();
        const title = 'button test'

        const { getByTestId } = render(<CustomButton title={title} onPress={mockOnPress} />)
        fireEvent.press(getByTestId('custom-btn-wrapper'))
        fireEvent.press(getByTestId('custom-btn-wrapper'))
        fireEvent.press(getByTestId('custom-btn-wrapper'))
        fireEvent.press(getByTestId('custom-btn-wrapper'))

        expect(mockOnPress).toHaveBeenCalled()
        expect(mockOnPress).toBeCalledTimes(4);
    })

    it('shows default wrapper style', () => {
        const mockButtonStyle = {
            backgroundColor: colors.jordyBlue,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1
        }

        const title = 'button test'
        const {getByTestId} = render(<CustomButton title={title} />)
        const wrapStyle = getByTestId('custom-btn-wrapper').props.style
        expect(JSON.stringify(wrapStyle)).toBe(JSON.stringify(mockButtonStyle))

    })

    it('shows custom wrapper style', () => {
        const mockCustomButtonStyle = {
            backgroundColor: colors.oxfordBlue,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1
        }

        const title = 'button test'
        const {getByTestId} = render(<CustomButton title={title} buttonStyle={mockCustomButtonStyle} />)
        const wrapStyle = getByTestId('custom-btn-wrapper').props.style
        expect(JSON.stringify(wrapStyle)).toBe(JSON.stringify(mockCustomButtonStyle))
    })

    it('shows default text style', () => {
        const mockTextStyle = [{
            color: colors.white,
            fontSize: 16,
            fontFamily: 'DMSansBold'
        }, null]

        const title = 'button test'
        const {getByTestId} = render(<CustomButton title={title} />)
        const textStyle = getByTestId('custom-btn-text').props.style
        expect(JSON.stringify(textStyle)).toBe(JSON.stringify(mockTextStyle))
    })

    it('shows custom text style', () => {
        const mockTextDefStyle = {
            color: colors.white,
            fontSize: 16,
            fontFamily: 'DMSansBold'
        }

        const mockTextCustStyle = {
            padding: 15,
            borderRadius: 5
        }

        const title = 'button test'
        const {getByTestId} = render(<CustomButton title={title} textStyle={mockTextCustStyle}/>)
        const textStyle = getByTestId('custom-btn-text').props.style
        expect(JSON.stringify(textStyle)).toBe(JSON.stringify([mockTextDefStyle, mockTextCustStyle]))
    })
})