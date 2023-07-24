import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Unocss from "unocss/vite"
import { presetIcons, presetUno } from "unocss"
import extractorSvelte from "@unocss/extractor-svelte"
import { presetScrollbar } from "unocss-preset-scrollbar"

export default defineConfig({
	plugins: [sveltekit(), Unocss({
		extractors: [extractorSvelte],
		presets: [presetUno(), presetIcons(), presetScrollbar()]
	})]
});
