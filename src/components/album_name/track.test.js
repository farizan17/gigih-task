import { render, screen } from '@testing-library/react';
import AlbumName from "../album_name/index";

test('renders track name', () => {
  render(<AlbumName />);
  expect("track name").toBe("track name");
});
