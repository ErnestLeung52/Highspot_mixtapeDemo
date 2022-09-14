import { Mixtape, Playlist, RemovePlaylistAction } from '../types/interface';
import { findPlaylistId } from '../validation/validateInput';

export const removePlaylist = (
	input: Mixtape,
	actions: RemovePlaylistAction
) => {
	const { playlists } = input;
	const { playlist_id } = actions;

	const playlist: Playlist | undefined = findPlaylistId(playlists, playlist_id);

	// Validate playlist_id exist in mixtape
	if (playlist === undefined) {
		throw `playlist_id ${playlist_id} doese not exist in mixtape`;
	}

	let deleteIndex: number | undefined;

	playlists.forEach((playlist, index) => {
		if (playlist.id === playlist_id) {
			deleteIndex = index;
		}
	});

	if (deleteIndex === undefined) {
		return 'Cannot find playlist id';
	}

	playlists.splice(deleteIndex, 1);

	return input;
};
