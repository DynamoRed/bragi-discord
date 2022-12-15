import { Client } from "discord.js";

export interface IEvent {
	name: string;
	execute: (app: Client, ...args: any) => void;
	once?: boolean;
}