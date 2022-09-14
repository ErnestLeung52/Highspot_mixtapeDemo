import { addPlaylist } from '../actions/addPlaylist';
import { Playlist, Song, User } from '../types/interface';

// add_song_to_playlist
// 1. check playlist_id exists in mixtape
// 2. check song_id exists in mixtape
// 3. check song_id is not duplicated in playlist

// add_playlist
// 1. check user_id exists in mixtape
// 2. check songs_id exists in mixtape
// 3. Check playlist is not empty

// remove_playlist
// 1. check playlist_id exists in mixtape

export const findPlaylistId = (playlists: Playlist[], id: string) => {
	return playlists.find((list) => list.id === id);
};

export const findSongId = (songs: Song[], id: string) => {
	return songs.find((song) => song.id === id);
};

export const findUserId = (users: User[], id: string) => {
	return users.find((user) => user.id === id);
};

export const isSongDuplicated = (playlist: Playlist, id: string) => {
	return playlist.song_ids.includes(id);
};

export const findAbsentSongIds = (songs: Song[], idsArr: string[]) => {
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
