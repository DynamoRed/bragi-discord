export interface IAppConfig {
	shorten: string; // Shorten a URL
	get: string; // Get specific link informations | {code}
	authorization: string; // Verify if a API Key is valid | {uuid}
}