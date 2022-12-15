import { ColorResolvable } from "discord.js";

interface _IUrls {
	main: string;
}

export interface IEnvConfig {
	informations: {
		name: string;
		version: string;
	};
	urls: _IUrls;
	colors: {
		blurple: ColorResolvable;
		yellow: ColorResolvable;
		green: ColorResolvable;
		red: ColorResolvable;
		transparent: ColorResolvable;
	};
}