import { IAppConfig } from "./interfaces/app.interface";
import { Configuration } from "./config.util";
import fs from 'fs';

export class API {
	private _appConfig: IAppConfig;
	private _envConfig: Configuration;

	constructor(){
		this._appConfig = JSON.parse(fs.readFileSync('./src/config/app.config.json').toString());
		this._envConfig = new Configuration();
	}

	shortenUrl(): string {
		return this._envConfig.urls.main + this._appConfig.shorten;
	}

	getUrl(code: string = "NULL"): string {
		return this._envConfig.urls.main + this._appConfig.get.replace("{code}", code);
	}

	authorizationUrl(uuid: string = "NULL"): string {
		return this._envConfig.urls.main + this._appConfig.authorization.replace("{uuid}", uuid);
	}
}