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
	mixTapeFilePath: string,
	changesFilePath: string,
	outputFilePath: string
) => {
	// Read and parse mixtape & changes json file

	const rawMixtapeData = fs.readFileSync(mixTapeFilePath);
	const rawChangesActions = fs.readFileSync(changesFilePath);

	const mixtapeData: Mixtape = JSON.parse(rawMixtapeData.toString());
	const changesActions: Actions[] = JSON.parse(rawChangesActions.toString());

	// Check if input files are empty
	if (Object.entries(mixtapeData).length === 0) {
		throw `File ${mixTapeFilePath} is empty! Unprocessable Entity.`;
	}
	if (Object.entries(changesActions).length === 0) {
		throw `File ${changesFilePath} is empty! Unprocessable Entity.`;
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

	console.log(mixtapeData.playlists);

	const outputJSON = JSON.stringify(mixtapeData);

	const writeFile = (filePath: string, content: string) => {
		fs.writeFile(
			filePath,
			content,
			{ encoding: 'utf-8', flag: 'wx' },
			(err) => {
				if (err) {
					console.log('File ' + filePath + ' already exists, testing next');
					let fileName = filePath.replace(/.json/g, '');
					let number = 0;
					fileName = fileName + 1;
					writeFile(filePath, content);
				} else {
					console.log('Successfully written ' + filePath);
				}
			}
		);
	};
	writeFile(outputFilePath, outputJSON);
};
