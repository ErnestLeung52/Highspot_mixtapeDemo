import exp from 'constants';
import { addSongToPlaylist } from '../src/actions/addSongToPlaylist';
import {
	Mixtape,
	AddSongToPlaylistAction,
	Action,
} from '../src/types/interface';

describe('addSongToPlaylist.test.ts', () => {
	test('add an existing song to an existing playlist', () => {
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
			`Succesfully added song_id (${addSongAction.song_id}) to playlist_id (${addSongAction.playlist_id})`
		);
	});

	test('add an existing song to an invalid playlist', () => {
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

	test('add an invalid song to an existing playlist', () => {
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

	test('add a duplicate song to an existing playlist', () => {
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
			`Succesfully added song_id (${addSongAction.song_id}) to playlist_id (${addSongAction.playlist_id})`
		);
	});
});
