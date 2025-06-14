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

type IconVariant = "pi" | "fi" | 'fa';
type CardinalDirection = "top" | "bottom" | 'left' | 'right';
type Position = CardinalDirection;
type HorizontalPosition = Exclude<Position, 'top' | 'bottom'>;
type VerticalPosition = Exclude<Position, 'right' | 'left'>;
type InputVariant = 'basic' | 'gray' | 'underline';
type InputType = "text" | "password" | "email"
  | "number" | "tel" | "url" | "search" | "date"
  | "datetime-local" | "month" | "week" | "time" | "color"
  | "checkbox" | "radio" | "range" | "file" | "hidden"
  | "submit" | "reset" | "button" | "image";
type TextareaResize = 'x' | 'y' | 'xy' | 'none' | undefined;
type Alignment = 'start' | 'end';
type OverflowPosition = Exclude<TextareaResize, "xy"> | 'auto';
type FormInputValidateState = 'success' | 'error' | 'warning';
type Orientation = "horizontal" | "vertical";
type DropdownPlacement = "top" |
  "top-left" |
  "top-right" |
  "bottom" |
  "bottom-left" |
  "bottom-right" |
  "left" |
  "left-top" |
  "left-bottom" |
  "right" |
  "right-top" |
  "right-bottom"
  ;

type DropdownTriggerType = 'click' | 'hover' | 'none';
type StepperStatus = 'none' | 'completed' | 'error' | 'processed';
type StepperStepType = 'numbered' | 'iconic' | 'custom';
type InputValidationMode = 'change' | 'blur' | 'any';

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
  IconVariant,
  Position,
  Alignment,
  CardinalDirection,
  VerticalPosition,
  HorizontalPosition,
  InputVariant,
  InputType,
  TextareaResize,
  OverflowPosition,
  FormInputValidateState,
  Orientation,
  DropdownPlacement,
  DropdownTriggerType,
  StepperStatus,
  StepperStepType,
  InputValidationMode
}
