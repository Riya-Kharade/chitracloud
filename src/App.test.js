import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app header", () => {
  render(<App />);
  expect(screen.getByText(/chitracloud/i)).toBeInTheDocument();
  expect(screen.getByText(/cloud image editor/i)).toBeInTheDocument();
});
