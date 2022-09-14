import {
	AddPlaylistAction,
	Mixtape,
	Playlist,
	Song,
	User,
} from '../types/interface';

export const addPlaylist = (input: Mixtape, actions: AddPlaylistAction) => {
	const { playlists, users, songs } = input;
	const { user_id, song_ids } = actions;

	// Check new playlist should contain at least one song
	if (song_ids.length === 0) {
		throw `Error: Fail to add songs to playlist - empty song_ids in new playlist`;
	}

	// Check user_id exists in mixtape
	if (findUserId(users, user_id) === undefined) {
		throw `Error: user_id (${user_id}) does not exist in mixtape`;
	}

	// Check songs_id exists in mixtape
	const absentSongsSet = findAbsentSongIds(songs, song_ids);

	// Check songs in newly added playlist exist in mixtape
	if (absentSongsSet.length !== 0) {
		throw `Error: song_ids (${absentSongsSet}) do not exist in mixtape`;
	}

	// Create new playlist_id based on the last playslit_id
	let newPlaylistId;
	const isPlaylistsEmpty: boolean = playlists.length === 0 ? true : false;

	if (isPlaylistsEmpty) {
		newPlaylistId = '0';
	} else {
		const lastPlaylistId = Number(playlists[playlists.length - 1].id);
		newPlaylistId = (lastPlaylistId + 1).toString();
	}

	const newPlaylist: Playlist = {
		id: newPlaylistId,
		owner_id: user_id,
		song_ids,
	};

	playlists.push(newPlaylist);

	console.log(
		`Successfully added a new playlist_id (${newPlaylistId}) from user_id (${user_id}) with songs_ids (${song_ids})`
	);

	return input;
};

// Helper Functions
const findUserId = (users: User[], id: string) => {
	return users.find((user) => user.id === id);
};

const findAbsentSongIds = (songs: Song[], idsArr: string[]) => {
	const idsSet = new Set(idsArr);

	for (let i = 0; i < songs.length; i++) {
		if (idsSet.has(songs[i].id)) {
			idsSet.delete(songs[i].id);
		}

		if (idsSet.size === 0) {
			break;
		}
	}
	return Array.from(idsSet);
};
