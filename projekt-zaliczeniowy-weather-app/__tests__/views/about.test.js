import { render, fireEvent } from "@testing-library/react-native";
import { About } from "../../views/About";

describe("About", () => {
  it("Komponenty poprawnie sie renderuja", () => {
    const { getByText } = render(<About />);

    expect(getByText("About")).toBeDefined();

    const description = 'WeatherNow is your go-to weather app, providing accurate and reliable weather information right at your fingertips.'

    expect(getByText(description)).toBeDefined();
    expect(getByText("Authors:")).toBeDefined();
    expect(getByText("Olaf Iskra")).toBeDefined();
    expect(getByText("Marek Porębski")).toBeDefined();
  });
});