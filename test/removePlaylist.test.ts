import { removePlaylist } from '../src/actions/removePlaylist';
import { Action, Mixtape, RemovePlaylistAction } from '../src/types/interface';

test('remove a playlist', () => {
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

	removePlaylist(mixtape, removePlaylistAction);

	expect(mixtape.playlists.length).toBe(1);
});
