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
		// Collect input/changes/output files' paths from CLI
		const exampleFilePath = path.resolve(__dirname, '../../../example');
		const mixtapePath = exampleFilePath + `/${options.data}`;
		const changesPath = exampleFilePath + `/${options.changes}`;
		const outputPath = exampleFilePath + `/${options.output}`;

		// Process merging logics
		mergeChanges(mixtapePath, changesPath, outputPath);
	});
