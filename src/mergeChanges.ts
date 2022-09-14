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

export const mergeChanges = (
	mixTapeFilePath: string,
	changesFilePath: string,
	outputFilePath: string
) => {
	// Read and parse Mixtape json file
	const rawMixtapeData = fs.readFileSync(mixTapeFilePath);
	const mixtapeData: Mixtape = JSON.parse(rawMixtapeData.toString());

	// Read and parse Changes json file
	const rawChangesActions = fs.readFileSync(changesFilePath);
	const changesActions: Actions[] = JSON.parse(rawChangesActions.toString());

	// go through each action and execute a method based on the change type
	changesActions.forEach((changeAction: Actions) => {
		switch (changeAction.type) {
			case Action.AddSongToPlaylistAction:
				// Type-Casting
				return addSongToPlaylist(
					mixtapeData,
					<AddSongToPlaylistAction>changeAction
				);

			case Action.AddPlaylistAction:
				return addPlaylist(mixtapeData, <AddPlaylistAction>changeAction);

			case Action.RemovePlaylistAction:
				return removePlaylist(mixtapeData, <RemovePlaylistAction>changeAction);

			default:
				return 'Action does not exist!';
		}
	});

	console.log(mixtapeData.playlists);

	// const outputJSON = JSON.stringify(mixtapeData);
	// fs.writeFileSync(outputFilePath, outputJSON);
};
