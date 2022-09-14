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
		// try {
		const exampleFilePath = path.resolve(__dirname, '../../../example');
		const mixtapePath = exampleFilePath + `/${options.data}`;
		const changesPath = exampleFilePath + `/${options.changes}`;
		const outputPath = exampleFilePath + `/${options.output}`;

		mergeChanges(mixtapePath, changesPath, outputPath);
		// } catch (error: any) {
		// 	if (error.code === 'ENOENT') {
		// 		console.error('No such file or directory');
		// 	} else {
		// 		console.log('Here is the problem: ', error.message);
		// 	}
		// 	process.exit(1);
		// }
	});

// node dist/index.js mixtapeCLI -d mixtape.json -c changes.json -o output.json
