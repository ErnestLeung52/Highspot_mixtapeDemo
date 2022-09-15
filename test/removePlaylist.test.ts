import { removePlaylist } from '../src/actions/removePlaylist';
import { Action, Mixtape, RemovePlaylistAction } from '../src/types/interface';

describe('removePlaylist.ts', () => {
	test('successfully removed an existing playlist will display a log in console', () => {
		const mixtape: Mixtape = {
			users: [{ id: '1', name: 'Albin Jaye' }],
			playlists: [
				{
					id: '1',
					owner_id: '2',
					song_ids: ['1', '2'],
				},
				{
					id: '2',
					owner_id: '3',
					song_ids: ['6', '8', '11'],
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

		const removePlaylistAction: RemovePlaylistAction = {
			type: Action.RemovePlaylistAction,
			playlist_id: '2',
		};

		console.log = jest.fn();

		removePlaylist(mixtape, removePlaylistAction);

		expect(mixtape.playlists.length).toBe(1);
		expect(console.log).toHaveBeenCalledWith(
			`Successfully removed playlist_id (${removePlaylistAction.playlist_id}) from mixtape`
		);
	});

	test('removing an invalid playlist will throw an error', () => {
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
					id: '2',
					artist: 'Camila Cabello',
					title: 'Never Be the Same',
				},
			],
		};

		const removePlaylistAction: RemovePlaylistAction = {
			type: Action.RemovePlaylistAction,
			playlist_id: '2',
		};

		expect(mixtape.playlists[0].id).not.toBe(removePlaylistAction.playlist_id);
		expect(() => removePlaylist(mixtape, removePlaylistAction)).toThrow(
			`Error: playlist_id (${removePlaylistAction.playlist_id}) doese not exist in mixtape`
		);
	});

	test('removing a playlist from empty playlists will display a warning in console', () => {
		const mixtape: Mixtape = {
			users: [{ id: '1', name: 'Albin Jaye' }],
			playlists: [],
			songs: [
				{
					id: '2',
					artist: 'Camila Cabello',
					title: 'Never Be the Same',
				},
			],
		};

		const removePlaylistAction: RemovePlaylistAction = {
			type: Action.RemovePlaylistAction,
			playlist_id: '2',
		};

		console.log = jest.fn();

		removePlaylist(mixtape, removePlaylistAction);

		expect(mixtape.playlists.length).toBe(0);
		expect(console.log).toHaveBeenCalledWith(
			`Warning: there is nothing to be removed (empty playlists)`
		);
	});
});
