import { render, fireEvent } from "@testing-library/react-native";
import { Main } from "../../views/Main";

describe("Main", () => {
  it("Komponenty poprawnie sie renderuja", () => {
    const navigate = { navigate: () => {}}
    const { getByText } = render(<Main navigation={navigate} />);

    const header = getByText("WeatherNow");
    expect(header).toBeDefined();

    expect(getByText("Search Weather")).toBeDefined();
    expect(getByText("Favourites")).toBeDefined();
    expect(getByText("About")).toBeDefined();
    expect(getByText("Settings")).toBeDefined();
  });

  it("Po nacisniecie przycisku przenosi na odpowiedni widok", () => {
    const navigationMock = { push: jest.fn() };

    const { getByText } = render(<Main navigation={navigationMock} />);

    fireEvent.press(getByText("Search Weather"));
    fireEvent.press(getByText("Favourites"));
    fireEvent.press(getByText("About"));
    fireEvent.press(getByText("Settings"));

    expect(navigationMock.push).toHaveBeenCalledTimes(4);
    expect(navigationMock.push).toHaveBeenNthCalledWith(1, "Search");
    expect(navigationMock.push).toHaveBeenNthCalledWith(2, "Favourites");
    expect(navigationMock.push).toHaveBeenNthCalledWith(3, "About");
    expect(navigationMock.push).toHaveBeenNthCalledWith(4, "Settings");
  });
});