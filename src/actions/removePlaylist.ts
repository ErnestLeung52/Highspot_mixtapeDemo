import { Mixtape, Playlist, RemovePlaylistAction } from '../types/interface';

export const removePlaylist = (
	input: Mixtape,
	actions: RemovePlaylistAction
) => {
	const { playlists } = input;
	const { playlist_id } = actions;

	// Check if existing palylists are empty
	if (playlists.length === 0) {
		// handle error by either logging it or throwing the error
		console.log(`Warning: there is nothing to be removed (empty playlists)`);
	} else {
		const toDeletePlaylistIndex = findPlaylistIndex(playlists, playlist_id);

		// Check if playlist_id exists in mixtape
		if (toDeletePlaylistIndex === -1) {
			// handle error by either logging it or throwing the error
			throw `Error: playlist_id (${playlist_id}) doese not exist in mixtape`;
		} else {
			playlists.splice(toDeletePlaylistIndex, 1);

			console.log(
				`Successfully removed playlist_id (${playlist_id}) from mixtape`
			);
		}
	}

	return input;
};

// Helper function
const findPlaylistIndex = (playlists: Playlist[], id: string) => {
	return playlists.findIndex((playlist) => playlist.id === id);
};
