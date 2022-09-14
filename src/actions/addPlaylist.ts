import { AddPlaylistAction, Mixtape, Playlist } from '../types/interface';
import { findAbsentSongIds, findUserId } from '../validation/validateInput';

export const addPlaylist = (input: Mixtape, actions: AddPlaylistAction) => {
	const { playlists, users, songs } = input;
	const { user_id, song_ids } = actions;

	// Validate new playlist should contain at least one song
	if (song_ids.length === 0) {
		throw `fail to add songs to playlist (empty song_ids)`;
	}

	// Validate user_id exists in mixtape
	if (findUserId(users, user_id) === undefined) {
		throw `user_id:${user_id} does not exist in mixtape`;
	}

	// Validate songs_id exists in mixtape
	const absentSongsSet = findAbsentSongIds(songs, song_ids);

	// Validate new playlist's songs exist in mixtape
	if (absentSongsSet.length !== 0) {
		throw `song_ids: ${absentSongsSet} do not exist in mixtape`;
	}

	// Generate new playlist id
	const lastPlaylistId = Number(playlists[playlists.length - 1].id);
	const newPlaylistId = (lastPlaylistId + 1).toString();

	const newPlaylist: Playlist = {
		id: newPlaylistId,
		owner_id: user_id,
		song_ids,
	};

	playlists.push(newPlaylist);

	console.log(
		`Successfully added new playlist id:${newPlaylistId} from user_id:${user_id} with songs_ids:${song_ids}`
	);

	return input;
};
