import { AddSongToPlaylistAction, Mixtape, Playlist } from '../types/interface';
import {
	findPlaylistId,
	findSongId,
	isSongDuplicated,
} from '../validation/validateInput';

// Duplicate song in playlist

export const addSongToPlaylist = (
	input: Mixtape,
	action: AddSongToPlaylistAction
) => {
	const { playlists, songs } = input;
	const { song_id, playlist_id } = action;

	// // Validate playlist_id exist in mixtape
	// const playlist = playlists.find((list) => list.id === playlist_id);
	// // Validate song_id exist in mixtape
	// const songId = songs.find((song) => song.id === song_id);
	// // Validate song_id is not duplicated in playlist
	// const duplicatedSongId = playlist?.song_ids.includes(song_id);

	const playlist: Playlist | undefined = findPlaylistId(playlists, playlist_id);

	// Validate playlist_id exist in mixtape
	if (playlist === undefined) {
		throw `playlist_id ${playlist_id} doese not exist in mixtape`;
	}

	// Validate song_id exist in mixtape
	if (findSongId(songs, song_id) === undefined) {
		throw `song_id ${song_id} does not exist in mixtape`;
	}

	// Validate song_id is not duplicated in playlist
	if (isSongDuplicated(playlist, song_id) === true) {
		throw `song_id ${song_id} is duplicated playlist`;
	}

	// Passed all checks

	// playlist?.song_ids.push(song_id);
	playlist.song_ids.push(song_id);

	console.log(
		`Succesfully Added song_id ${song_id} to playlist_id ${playlist_id} `
	);

	return input;
};
