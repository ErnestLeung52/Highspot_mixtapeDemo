export interface Mixtape {
	users: User[];
	playlists: Playlist[];
	songs: Song[];
}

export interface User {
	id: string;
	name: string;
}

export interface Playlist {
	id: string;
	owner_id: string;
	song_ids: string[];
}

export interface Song {
	id: string;
	artist: string;
	title: string;
}

export interface AddSongToPlaylistAction {
	type: Action;
	song_id: string;
	playlist_id: string;
}

export interface AddPlaylistAction {
	type: Action;
	user_id: string;
	song_ids: string[];
}

export interface RemovePlaylistAction {
	type: Action;
	playlist_id: string;
}

export type Actions =
	| AddSongToPlaylistAction
	| AddPlaylistAction
	| RemovePlaylistAction;

export enum Action {
	AddSongToPlaylistAction = 'add_song_to_playlist',
	AddPlaylistAction = 'add_playlist',
	RemovePlaylistAction = 'remove_playlist',
}
