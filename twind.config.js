import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";
import config from "./tailwind.config";
config.presets = config?.presets?[...config?.presets,presetTailwind, presetAutoprefix,presetTypography] : [presetTailwind, presetAutoprefix,presetTypography];
export default defineConfig(config);