import { getRegExp } from "./getRegExp.utils";

const { _rx_space } = getRegExp.test();

export const slug = (value: string): string => value.toLowerCase().replace(_rx_space, "-");