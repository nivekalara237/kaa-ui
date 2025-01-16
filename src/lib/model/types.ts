type Color =
  "slate" |
  "gray" |
  "zinc" |
  "neutral" |
  "stone" |
  "red" |
  "orange" |
  "ember" |
  "yellow" |
  "lime" |
  "green" |
  "emerald" |
  "amber" |
  "teal" |
  "cyan" |
  "sky" |
  "blue" |
  "indigo" |
  "violet" |
  "purple" |
  "fuchsia" |
  "pink" |
  "rose";

type Status = "primary" | "success" | "secondary" | "soft" | "danger" | "warning" | "default" | "info";

type Size = "tiny" | "small" | "medium" | "large" | "giant";

type Variant = "fill" | "outline" | "gradiant" | "text";

type RoundedSize = "none" | "small" | "medium" | "large" | "full";

type Typography = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "paragraph" | "code" | "quote" | "informative";

type Heading = Exclude<Typography, 'quote' | 'code' | 'paragraph' | 'informative'>;

type AlertRoundedSize = Exclude<Size, 'giant' | 'tiny'> | 'none' | 'full';

type AvatarShape = 'circle' | 'square' | 'rounded';

type ColorDensityKey = 'd50' | 'd100' | 'd200' | 'd300' | 'd400' | 'd500' | 'd600' | 'd700' | 'd800' | 'd900' | 'd950';
type ColorDensityValue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

type IconVariant = "pi" | "fi" | 'fa';
type CardinalDirection = "top" | "bottom" | 'left' | 'right';
type Position = CardinalDirection;
type HorizontalPosition = Exclude<Position, 'top' | 'bottom'>;
type VerticalPosition = Exclude<Position, 'right' | 'left'>;
type InputVariant = 'basic' | 'gray' | 'underline';


export const statusColor: Record<Status, Color> = {
  primary: 'blue',
  success: 'emerald',
  secondary: 'slate',
  info: "sky",
  danger: "red",
  default: "gray",
  soft: 'fuchsia',
  warning: "amber"
}
export type {
  Color,
  Status,
  Size,
  RoundedSize,
  Variant,
  Typography,
  Heading,
  AlertRoundedSize,
  AvatarShape,
  ColorDensityKey,
  ColorDensityValue,
  IconVariant,
  Position,
  CardinalDirection,
  VerticalPosition,
  HorizontalPosition,
  InputVariant
}
