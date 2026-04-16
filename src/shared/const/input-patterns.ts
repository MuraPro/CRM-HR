import type { ParseKeys } from "i18next";

import type { IInputPatternTypes } from "../types/input-pattern-types";

export const InputPatterns = {
  phone: {
    value: /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
    message: "invalidPhone",
  },
  email: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: "invalidEmail",
  },
  link: {
    value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    message: "invalidLink",
  },

  "account-number": {
    value: /^[0-9]{20,20}$/g,
    message: "invalidAccountNumber",
  },
  "inn-pnfl": {
    value: /^(?:\d{9}|\d{14})$/,
    message: "invalidInnOrPnfl",
  },
} as const satisfies Record<string, IInputPatternTypes<ParseKeys<"validation">>>;

export type PatternInputOptions = keyof typeof InputPatterns;
