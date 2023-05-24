import { render, fireEvent } from "@testing-library/react-native";
import { ListItem } from "../../components/ListItem";
import { colors } from "../../constants";

describe("ListItem", () => {

    beforeAll(() => {

        props = {
            addictionalStyles: {
                zIndex: -1,
                color: colors.black,
                padding: 5,
                opacity: 1,
            },
            listItemText: "Kraków",
        }

    });

    it('Components generete properly', () => {

        const { getByTestId } = render(<ListItem />);

        expect(getByTestId('list-item-wrapper')).toBeDefined();
        expect(getByTestId('list-item-text')).toBeDefined();

    });

    it('Component have text', () => {

        const { listItemText } = props;
        const { getByTestId } = render(<ListItem listItemText={listItemText} />);

        expect(getByTestId('list-item-text').children).toContain('Kraków');

    });

    it('Component have proper styles', () => {

        const { addictionalStyles } = props;
        const { getByTestId } = render(<ListItem addictionalStyles={addictionalStyles} />);

        expect(JSON.stringify(getByTestId('list-item-wrapper').props.style)).toContain(JSON.stringify(addictionalStyles));

    });

    it('Component onClick works', () => {

        const onClickMock = jest.fn();
        const { getByTestId } = render(<ListItem onListItemPress={onClickMock} />);

        fireEvent.press(getByTestId('list-item-wrapper'));

        expect(onClickMock).toBeCalled();

    });

    it('Component multiple onClick works', () => {

        const onClickMock = jest.fn();
        const { getByTestId } = render(<ListItem onListItemPress={onClickMock} />);

        fireEvent.press(getByTestId('list-item-wrapper'));
        fireEvent.press(getByTestId('list-item-wrapper'));

        expect(onClickMock).toHaveBeenCalledTimes(2);

    });

});