import { ColorResolvable } from "discord.js";
import { IEnvConfig } from "./interfaces/env.interface";
import fs from 'fs';

export class ColorsUtil {
    private _envConfig: IEnvConfig;

	constructor(){
		this._envConfig = JSON.parse(fs.readFileSync('./src/config/env.config.json').toString());
	}

    get transparent(): ColorResolvable {
        return this._envConfig.colors.transparent;
    }

    get red(): ColorResolvable {
        return this._envConfig.colors.red;
    }

    get green(): ColorResolvable {
        return this._envConfig.colors.green;
    }

    get yellow(): ColorResolvable {
        return this._envConfig.colors.yellow;
    }

    get blurple(): ColorResolvable {
        return this._envConfig.colors.blurple;
    }
}