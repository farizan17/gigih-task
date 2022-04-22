import { render, screen } from "@testing-library/react";
import { Textarea } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import AlbumName from "./components/album_name/index";
import Playlist from "./pages/playlist/index";

test("type text area in playlist description", () => {
  render(<Textarea />);

  userEvent.type(screen.getByRole("textbox"), "Hello,{enter}World!");
  expect(screen.getByRole("textbox")).toHaveValue("Hello,\nWorld!");
});

test("renders track name", () => {
  render(<AlbumName />);
});

test("get text in playlist", () => {
  render(<Playlist />);
  expect(screen.getByText("Add Song")).toBeInTheDocument();
});
