import path from 'path';
import { Command } from 'commander';
import { mergeChanges } from '../mergeChanges';

export const mixtapeCommand = new Command()
	.command('mixtapeCLI')
	.description('Select two files to merge changes')
	.option('-d, --data <data>', 'ingest mixtape file')
	.option('-c, --changes <changes>', 'ingest changes file')
	.option('-o, --output [output]', 'output data file', 'output.json')
	.action((options: { data: string; changes: string; output: string }) => {
		// Collect input/changes/output files' names from CLI
		const mixtapeName = options.data;
		const changesName = options.changes;
		const outputName = options.output;

		// Process merging logics
		mergeChanges(mixtapeName, changesName, outputName);
	});
