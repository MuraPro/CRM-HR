import { type MaskitoOptions, type MaskitoPreprocessor, maskitoInitialCalibrationPlugin } from "@maskito/core";
import { maskitoAddOnFocusPlugin, maskitoCaretGuard, maskitoNumberOptionsGenerator, maskitoPrefixPostprocessorGenerator } from "@maskito/kit";

export type MaskInputOptions = "phone" | "color" | "pin" | "cardNumber" | "passport" | "passportSerial" | "passportNumber" | "amount";

export const InputMasks: Record<MaskInputOptions, { options: MaskitoOptions }> = {
  amount: {
    options: {
      ...maskitoNumberOptionsGenerator({
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        decimalSeparator: ".",
      }),

      //! Плагин для изначально форматирования не контролируемых инпутов
      plugins: [maskitoInitialCalibrationPlugin()],
    },
  },

  phone: {
    options: {
      mask: ["+", "9", "9", "8", " ", "(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/],
      preprocessors: [createCompletePhoneInsertionPreprocessor()],
      postprocessors: [maskitoPrefixPostprocessorGenerator("+998 ")],
      plugins: [maskitoAddOnFocusPlugin("+998 "), maskitoCaretGuard((value, [from, to]) => [from === to ? "+998 ".length : 0, value.length])],
    },
  },
  color: {
    options: {
      mask: ["#", /[0-9a-fA-F]/, /[0-9a-fA-F]/, /[0-9a-fA-F]/, /[0-9a-fA-F]/, /[0-9a-fA-F]/, /[0-9a-fA-F]/],
      plugins: [maskitoAddOnFocusPlugin("#")],
    },
  },

  pin: {
    options: {
      mask: [...new Array(14).fill(/\d/)],
    },
  },

  // 16 digits with spaces, e.g. - 0000 0000 0000 0000
  cardNumber: {
    options: {
      mask: [...new Array(4).fill(/\d/), " ", ...new Array(4).fill(/\d/), " ", ...new Array(4).fill(/\d/), " ", ...new Array(4).fill(/\d/)],
    },
  },

  // Firstly two letters in uppercase, then 7 digits, e.g. - AA 0000000
  passport: {
    options: {
      mask: [/[A-Z]/i, /[A-Z]/i, " ", ...new Array(7).fill(/\d/)],
    },
  },

  // Two letters in uppercase, e.g. - AA
  passportSerial: {
    options: {
      mask: [/[A-Z]/i, /[A-Z]/i],
    },
  },

  // 7 digits, e.g. - 0000000
  passportNumber: {
    options: {
      mask: [...new Array(7).fill(/\d/)],
    },
  },
};

function createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {
  const trimPrefix = (value: string): string => value.replace(/^(\+?998?)\s?/, "");
  const countDigits = (value: string): number => value.replaceAll(/\D/g, "").length;

  return ({ elementState, data }) => {
    const { value, selection } = elementState;

    return {
      elementState: {
        selection,
        value: countDigits(value) > 11 ? trimPrefix(value) : value,
      },
      data: countDigits(data) >= 11 ? trimPrefix(data) : data,
    };
  };
}
