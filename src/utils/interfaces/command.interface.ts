import { Client, CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export interface Permission {
	id: string;
	type: 'ROLE' | 'USER' | 'CHANNEL';
	permission: boolean;
}

export interface ICommand {
	name: string;
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
	execute: (interaction: CommandInteraction, app: Client) => void;
	timeout?: number;
	restrictToChannels?: string[];
	inTest?: boolean;
	global?: boolean;
	specificTo?: string[];
}