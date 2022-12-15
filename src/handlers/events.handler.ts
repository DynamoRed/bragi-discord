import { Logging, LogType } from "../utils/logging.util";
import app from '../app';
import fs from 'fs';
import { IEvent } from "../utils/interfaces/event.interface";

export class EventsHandler {
	static handle(): Promise<void>{
		return new Promise((resolve, reject) => {
			Logging.write(`Handling events`, LogType.Title);
			Logging.write(`Scanning events folder`);

			const events = fs.readdirSync('./src/events').filter(file => file.endsWith('.event.ts'));
			events.forEach(f => {
				const event: IEvent = require(`../events/${f}`);
				Logging.write(`Found ${event.name}: ${f}`);

				if(event.once) app.once(event.name, (...args) => event.execute(app, ...args));
				else app.on(event.name, (...args) => event.execute(app, ...args));
			});

			resolve();
		});
	}
}