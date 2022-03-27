import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login", () => {
  render(<App />);
  const login = screen.getByText("MoCaFi");
  expect(login).toBeInTheDocument();
});
