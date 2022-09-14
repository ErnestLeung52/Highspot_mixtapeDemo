import { addPlaylist } from '../src/actions/addPlaylist';
import { Action, AddPlaylistAction, Mixtape } from '../src/types/interface';

test('add a playlist', () => {
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

	addPlaylist(mixtape, addPlaylistAction);

	expect(mixtape.playlists.length).toBe(2);
	expect(mixtape.playlists[1].id).toBe('2');
	expect(mixtape.playlists[1].owner_id).toBe('3');
	expect(mixtape.playlists[1].song_ids).toEqual(['1', '2', '3']);
});
