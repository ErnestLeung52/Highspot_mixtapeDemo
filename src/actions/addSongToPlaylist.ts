import {
	AddSongToPlaylistAction,
	Mixtape,
	Playlist,
	Song,
} from '../types/interface';

export const addSongToPlaylist = (
	input: Mixtape,
	action: AddSongToPlaylistAction
) => {
	const { playlists, songs } = input;
	const { song_id, playlist_id } = action;

	const playlist = findPlaylist(playlists, playlist_id);

	// Check if playlist_id exists in mixtape
	if (playlist === undefined) {
		throw `Error: playlist_id (${playlist_id}) doese not exist in mixtape`;
	}

	// Check if song_id exists in mixtape
	if (findSong(songs, song_id) === undefined) {
		throw `Error: song_id (${song_id}) does not exist in mixtape`;
	}

	// Check if song_id is duplicated in playlist
	if (isSongDuplicated(playlist, song_id) === true) {
		console.log(
			`Warning: song_id (${song_id}) is duplicated in playlist (${playlist_id})`
		);
	}

	playlist.song_ids.push(song_id);

	console.log(
		`Succesfully added song_id (${song_id}) to playlist_id (${playlist_id})`
	);

	return input;
};

// Helper Functions
const findPlaylist = (playlists: Playlist[], id: string) => {
	return playlists.find((playlist) => playlist.id === id);
};

const findSong = (songs: Song[], id: string) => {
	return songs.find((song) => song.id === id);
};

const isSongDuplicated = (playlist: Playlist, id: string) => {
	return playlist.song_ids.includes(id);
};
