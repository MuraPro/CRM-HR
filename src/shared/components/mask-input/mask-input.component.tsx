import { type ChangeEvent, type InputEvent, type Ref, useEffect, useImperativeHandle, useMemo, useRef } from "react";

import { type MaskitoOptions, maskitoTransform } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { type IInputProps, Input } from "local-agro-ui";

import { mergeRefs } from "@/shared/utils/merge-refs";

import { InputMasks, type MaskInputOptions } from "./const";

interface IMaskInputProps extends IInputProps {
  maskOption: MaskInputOptions;
  maskitoOption?: { options: MaskitoOptions };
  ref?: Ref<HTMLInputElement>;
}

export const MaskInput = (props: IMaskInputProps) => {
  const { maskOption, onChange, ref, maskitoOption, value, ...otherProps } = props;

  const parseOptions: { options: MaskitoOptions } = useMemo(() => ({ ...InputMasks[maskOption], ...maskitoOption }), [maskOption, maskitoOption]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const maskedMaskitoRef = useMaskito(parseOptions);

  useImperativeHandle(ref, () => inputRef.current!, []);

  useEffect(() => {
    //! Сделано для изначального форматирования в сценариях когда у нас контролируемый input
    if (!inputRef.current) return;

    inputRef.current.value = maskitoTransform(String(value), parseOptions.options);
  }, [value]);

  const handleOnInputChange = (event: InputEvent<HTMLInputElement>) => {
    onChange?.(event as unknown as ChangeEvent<HTMLInputElement>);
  };

  return <Input {...otherProps} ref={mergeRefs(maskedMaskitoRef, inputRef)} onInput={handleOnInputChange} />;
};
