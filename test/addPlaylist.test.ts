import { addPlaylist } from '../src/actions/addPlaylist';
import { Action, AddPlaylistAction, Mixtape } from '../src/types/interface';

describe('addPlaylist.ts', () => {
	test('successfully added a new playlist with a valid user and valid songs will be logged', () => {
		const mixtape: Mixtape = {
			users: [
				{ id: '1', name: 'Albin Jaye' },
				{
					id: '2',
					name: 'Dipika Crescentia',
				},
			],
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
				{
					id: '2',
					artist: 'Zedd',
					title: 'The Middle',
				},
				{
					id: '3',
					artist: 'The Weeknd',
					title: 'Pray For Me',
				},
			],
		};

		const addPlaylistAction: AddPlaylistAction = {
			type: Action.AddPlaylistAction,
			user_id: '2',
			song_ids: ['1', '2', '3'],
		};

		console.log = jest.fn();

		addPlaylist(mixtape, addPlaylistAction);

		expect(mixtape.playlists.length).toBe(2);
		expect(mixtape.playlists[1].id).toBe('2');
		expect(mixtape.playlists[1].owner_id).toBe(addPlaylistAction.user_id);
		expect(mixtape.playlists[1].song_ids).toEqual(addPlaylistAction.song_ids);
		expect(console.log).toHaveBeenCalledWith(
			`Successfully added a new playlist_id (2) from user_id (${addPlaylistAction.user_id}) with songs_ids (${addPlaylistAction.song_ids})`
		);
	});

	test('adding a new playlist with empty songs will throw an error', () => {
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
		const addPlaylistAction: AddPlaylistAction = {
			type: Action.AddPlaylistAction,
			user_id: '3',
			song_ids: [],
		};

		expect(addPlaylistAction.song_ids.length).toBe(0);
		expect(() => addPlaylist(mixtape, addPlaylistAction)).toThrow(
			`Error: Fail to add songs to playlist - empty song_ids in new playlist`
		);
	});

	test('adding a new playlist with an invalid user will throw an error', () => {
		const mixtape: Mixtape = {
			users: [
				{ id: '1', name: 'Albin Jaye' },
				{
					id: '2',
					name: 'Dipika Crescentia',
				},
			],
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
				{
					id: '2',
					artist: 'Zedd',
					title: 'The Middle',
				},
				{
					id: '3',
					artist: 'The Weeknd',
					title: 'Pray For Me',
				},
			],
		};

		const addPlaylistAction: AddPlaylistAction = {
			type: Action.AddPlaylistAction,
			user_id: '3',
			song_ids: ['1', '2', '3'],
		};

		expect(mixtape.users[0].id).not.toBe(addPlaylistAction.user_id);
		expect(mixtape.users[1].id).not.toBe(addPlaylistAction.user_id);
		expect(addPlaylistAction.song_ids.length).not.toBe(0);
		expect(() => {
			addPlaylist(mixtape, addPlaylistAction);
		}).toThrowError(
			`Error: user_id (${addPlaylistAction.user_id}) does not exist in mixtape`
		);
	});

	test('adding a new playlist with one invalid song will throw an error', () => {
		const mixtape: Mixtape = {
			users: [
				{ id: '1', name: 'Albin Jaye' },
				{
					id: '2',
					name: 'Dipika Crescentia',
				},
			],
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
				{
					id: '2',
					artist: 'Zedd',
					title: 'The Middle',
				},
				{
					id: '3',
					artist: 'The Weeknd',
					title: 'Pray For Me',
				},
			],
		};

		const addPlaylistAction: AddPlaylistAction = {
			type: Action.AddPlaylistAction,
			user_id: '1',
			song_ids: ['4'],
		};

		expect(mixtape.users[0].id).toBe(addPlaylistAction.user_id);
		expect(addPlaylistAction.song_ids.length).not.toBe(0);
		expect(addPlaylistAction.song_ids.length).toBe(1);
		expect(() => addPlaylist(mixtape, addPlaylistAction)).toThrow(
			`Error: song_ids (${addPlaylistAction.song_ids}) do not exist in mixtape`
		);
	});

	test('adding a new playlist with multiple invalid songs will throw an error', () => {
		const mixtape: Mixtape = {
			users: [
				{ id: '1', name: 'Albin Jaye' },
				{
					id: '2',
					name: 'Dipika Crescentia',
				},
			],
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
				{
					id: '2',
					artist: 'Zedd',
					title: 'The Middle',
				},
				{
					id: '3',
					artist: 'The Weeknd',
					title: 'Pray For Me',
				},
			],
		};

		const addPlaylistAction: AddPlaylistAction = {
			type: Action.AddPlaylistAction,
			user_id: '1',
			song_ids: ['4', '5', '6'],
		};

		expect(mixtape.users[0].id).toBe(addPlaylistAction.user_id);
		expect(addPlaylistAction.song_ids.length).not.toBe(0);
		expect(() => addPlaylist(mixtape, addPlaylistAction)).toThrow(
			`Error: song_ids (${addPlaylistAction.song_ids}) do not exist in mixtape`
		);
	});

	test('adding a new playlist with some valid and invalid songs will throw an error', () => {
		const mixtape: Mixtape = {
			users: [
				{ id: '1', name: 'Albin Jaye' },
				{
					id: '2',
					name: 'Dipika Crescentia',
				},
			],
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
				{
					id: '2',
					artist: 'Zedd',
					title: 'The Middle',
				},
				{
					id: '3',
					artist: 'The Weeknd',
					title: 'Pray For Me',
				},
			],
		};

		const addPlaylistAction: AddPlaylistAction = {
			type: Action.AddPlaylistAction,
			user_id: '1',
			song_ids: ['1', '2', '5', '6'],
		};

		expect(mixtape.users[0].id).toBe(addPlaylistAction.user_id);
		expect(addPlaylistAction.song_ids.length).not.toBe(0);
		expect(() => addPlaylist(mixtape, addPlaylistAction)).toThrow(
			`Error: song_ids (5,6) do not exist in mixtape`
		);
	});
});
