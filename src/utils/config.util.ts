import { IEnvConfig } from "./interfaces/env.interface";
import fs from 'fs';

export class Configuration {
	private _envConfig: IEnvConfig;

	constructor(){
		this._envConfig = JSON.parse(fs.readFileSync('./src/config/env.config.json').toString());
	}

	get name(){
		return this._envConfig.informations.name;
	}

	get version(){
		return this._envConfig.informations.version;
	}

	get urls(){
		return this._envConfig.urls;
	}
}