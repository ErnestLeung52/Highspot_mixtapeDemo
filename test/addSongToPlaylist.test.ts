import { addSongToPlaylist } from '../src/actions/addSongToPlaylist';
import {
	Mixtape,
	AddSongToPlaylistAction,
	Action,
} from '../src/types/interface';

test('add a song to an existing playlist', () => {
	const mixtape: Mixtape = {
		users: [{ id: '1', name: 'Albin Jaye' }],
		playlists: [
			{
				id: '1',
				owner_id: '2',
				song_ids: ['1', '2'],
			},
		],
		songs: [],
	};

	const addSongAction: AddSongToPlaylistAction = {
		type: Action.AddSongToPlaylistAction,
		song_id: '3',
		playlist_id: '1',
	};

	addSongToPlaylist(mixtape, addSongAction);

	expect(mixtape.playlists[0].song_ids.length).toBe(3);
	expect(
		mixtape.playlists[0].song_ids[mixtape.playlists[0].song_ids.length - 1]
	).toBe('3');
	expect(mixtape.playlists[0].id).toBe('1');
});
