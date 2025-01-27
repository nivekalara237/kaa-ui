enum StateName {
  ON = "ON",
  OFF = "OFF",
  PARTIAL = "PARTIAL"
}

interface CheckBoxState {
  value: StateName

  next(): CheckBoxState;
}

const On: CheckBoxState = {
  next(): CheckBoxState {
    return Partial;
  },
  value: StateName.ON
}

const Partial: CheckBoxState = {
  next(): CheckBoxState {
    return Off;
  },
  value: StateName.PARTIAL
}

const Off: CheckBoxState = {
  next(): CheckBoxState {
    return On;
  },
  value: StateName.OFF
}

export {
  type CheckBoxState,
  Off,
  On,
  Partial
}

