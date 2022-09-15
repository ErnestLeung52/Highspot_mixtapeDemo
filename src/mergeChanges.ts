import * as fs from 'fs';
import {
	Action,
	Actions,
	AddSongToPlaylistAction,
	AddPlaylistAction,
	RemovePlaylistAction,
	Mixtape,
} from './types/interface';
import { addPlaylist } from './actions/addPlaylist';
import { addSongToPlaylist } from './actions/addSongToPlaylist';
import { removePlaylist } from './actions/removePlaylist';
import path from 'path';

export const mergeChanges = (
	mixTapeFileName: string,
	changesFileName: string,
	outputFileName: string
) => {
	// Find example folder's absolute path
	const exampleFolderPath = path.resolve(__dirname, '../../example');

	const mixtapePath = path.join(exampleFolderPath, mixTapeFileName);
	const changesPath = path.join(exampleFolderPath, changesFileName);

	// Read and parse mixtape & changes json file
	const rawMixtapeData = fs.readFileSync(mixtapePath);
	const rawChangesActions = fs.readFileSync(changesPath);

	const mixtapeData: Mixtape = JSON.parse(rawMixtapeData.toString());
	const changesActions: Actions[] = JSON.parse(rawChangesActions.toString());

	// Check if input files are empty
	if (Object.entries(mixtapeData).length === 0) {
		throw `File ${mixTapeFileName} is empty! Unprocessable Entity.`;
	}
	if (Object.entries(changesActions).length === 0) {
		throw `File ${changesFileName} is empty! Unprocessable Entity.`;
	}

	// Execute an action based on the each changes' type
	changesActions.forEach((changeAction: Actions) => {
		switch (changeAction.type) {
			case Action.AddSongToPlaylistAction:
				return addSongToPlaylist(
					mixtapeData,
					<AddSongToPlaylistAction>changeAction
				);

			case Action.AddPlaylistAction:
				return addPlaylist(mixtapeData, <AddPlaylistAction>changeAction);

			case Action.RemovePlaylistAction:
				return removePlaylist(mixtapeData, <RemovePlaylistAction>changeAction);

			default:
				throw `Error: Type ${changeAction.type} does not exist!`;
		}
	});

	const outputJSON = JSON.stringify(mixtapeData, null, 2);

	const outputFilePath = joinPath(exampleFolderPath, outputFileName);

	// Write output JSON file to example folder
	writeOutputToExample(
		outputFilePath,
		outputFileName,
		exampleFolderPath,
		outputJSON
	);
};

// Helper Functions
const joinPath = (dir: string, fileName: string) => {
	return path.join(dir, fileName);
};

// Rename file if file already exists in example folder
const renameOutputFile = (fileName: string) => {
	const fileNameWithoutExt = fileName.replace(/.json/g, '');
	const fileNameLetters = fileNameWithoutExt.replace(/[^a-z]/gi, '');
	const newDigits = Number(fileNameWithoutExt.replace(/\D/g, '')) + 1;
	const newFileName = fileNameLetters + newDigits + '.json';

	return newFileName;
};

// Handle duplicate files name when writing file to local
const writeOutputToExample = (
	fileNamePath: string,
	fileName: string,
	folderPath: string,
	data: string
) => {
	// Write to example folder file
	fs.writeFile(fileNamePath, data, { encoding: 'utf-8', flag: 'wx' }, (err) => {
		if (err) {
			console.log(`File ${fileName} already exists, testing next`);

			const newFileName = renameOutputFile(fileName);

			const newFileOutputPath = joinPath(folderPath, newFileName);

			writeOutputToExample(newFileOutputPath, newFileName, folderPath, data);
		} else {
			console.log(`Successfully written ${fileName}`);
		}
	});
};
