import exp from 'constants';
import { addSongToPlaylist } from '../src/actions/addSongToPlaylist';
import {
	Mixtape,
	AddSongToPlaylistAction,
	Action,
} from '../src/types/interface';

describe('addSongToPlaylist.ts', () => {
	test('successfully added an existing song to an existing playlist will display a log in console', () => {
		const mixtape: Mixtape = {
			users: [{ id: '1', name: 'Albin Jaye' }],
			playlists: [
				{
					id: '1',
					owner_id: '2',
					song_ids: ['1', '2'],
				},
			],
			songs: [
				{
					id: '3',
					artist: 'The Weeknd',
					title: 'Pray For Me',
				},
			],
		};

		const addSongAction: AddSongToPlaylistAction = {
			type: Action.AddSongToPlaylistAction,
			song_id: '3',
			playlist_id: '1',
		};

		console.log = jest.fn();

		addSongToPlaylist(mixtape, addSongAction);

		expect(mixtape.playlists[0].song_ids.length).toBe(3);
		expect(
			mixtape.playlists[0].song_ids[mixtape.playlists[0].song_ids.length - 1]
		).toBe('3');
		expect(mixtape.playlists[0].id).toBe('1');
		expect(console.log).toHaveBeenCalledWith(
			`Successfully added song_id (${addSongAction.song_id}) to playlist_id (${addSongAction.playlist_id})`
		);
	});

	test('adding an existing song to an invalid playlist will throw an error', () => {
		const mixtape: Mixtape = {
			users: [{ id: '1', name: 'Albin Jaye' }],
			playlists: [
				{
					id: '1',
					owner_id: '2',
					song_ids: ['1', '2'],
				},
			],
			songs: [
				{
					id: '1',
					artist: 'Camila Cabello',
					title: 'Never Be the Same',
				},
			],
		};

		const addSongAction: AddSongToPlaylistAction = {
			type: Action.AddSongToPlaylistAction,
			song_id: '1',
			playlist_id: '2',
		};

		expect(mixtape.playlists[0].id).not.toBe(addSongAction.playlist_id);
		expect(mixtape.songs[0].id).toBe(addSongAction.song_id);
		expect(() => {
			addSongToPlaylist(mixtape, addSongAction);
		}).toThrowError(
			`Error: playlist_id (${addSongAction.playlist_id}) doese not exist in mixtape`
		);
	});

	test('adding an invalid song to an existing playlist will throw an error', () => {
		const mixtape: Mixtape = {
			users: [{ id: '1', name: 'Albin Jaye' }],
			playlists: [
				{
					id: '1',
					owner_id: '2',
					song_ids: ['1', '2'],
				},
			],
			songs: [
				{
					id: '1',
					artist: 'Camila Cabello',
					title: 'Never Be the Same',
				},
			],
		};

		const addSongAction: AddSongToPlaylistAction = {
			type: Action.AddSongToPlaylistAction,
			song_id: '3',
			playlist_id: '1',
		};

		expect(mixtape.playlists[0].id).toBe(addSongAction.playlist_id);
		expect(mixtape.songs[0].id).not.toBe('addSongAction.song_id');
		expect(() => {
			addSongToPlaylist(mixtape, addSongAction);
		}).toThrow(
			`Error: song_id (${addSongAction.song_id}) does not exist in mixtape`
		);
	});

	test('adding a duplicate song to an existing playlist will display a warning in console', () => {
		const mixtape: Mixtape = {
			users: [{ id: '1', name: 'Albin Jaye' }],
			playlists: [
				{
					id: '1',
					owner_id: '2',
					song_ids: ['1', '2'],
				},
			],
			songs: [
				{
					id: '1',
					artist: 'Camila Cabello',
					title: 'Never Be the Same',
				},
			],
		};

		const addSongAction: AddSongToPlaylistAction = {
			type: Action.AddSongToPlaylistAction,
			song_id: '1',
			playlist_id: '1',
		};

		console.log = jest.fn();

		addSongToPlaylist(mixtape, addSongAction);

		expect(mixtape.playlists[0].id).toBe(addSongAction.playlist_id);
		expect(mixtape.playlists[0].song_ids[0]).toBe(addSongAction.song_id);
		expect(console.log).toHaveBeenCalledWith(
			`Warning: song_id (${addSongAction.song_id}) is duplicated in playlist (${addSongAction.playlist_id})`
		);
		expect(console.log).toHaveBeenCalledWith(
			`Successfully added song_id (${addSongAction.song_id}) to playlist_id (${addSongAction.playlist_id})`
		);
	});
});
