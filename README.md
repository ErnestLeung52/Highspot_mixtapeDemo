# Mixtape Highspot Assignment

A command-line utility to modify a mixtape data set based on changes. The application ingests an input file (mixtape.json in the example folder) containing information about users, songs, and playlists along with a changes file (changes.json in the example folder) containing a set of change actions. It then creates and saves an output file (output.json in the example folder) that contains the changes made to the input file.

## Project Setup & Quickstart

1. Clone repo to local environment <br/> `git clone https://github.com/ErnestLeung52/Highspot_mixtapeDemo.git`
2. Install dependencies <br/> `npm install`
3. Start TypeScript compilation in watch mode <br/> `npm run start`
4. Run unit tests <br/>`npm run test`
5. CLI usage help <br/> `node dist/index.js mixtapeCLI --help`

```
Select two files to merge changes Options:
  -d, --data <data>        ingest mixtape file
  -c, --changes <changes>  ingest changes file
  -o, --output [output]    output data file (default: "output.json")
  -h, --help               display help for command
```

## Application Instructions

- _Data file_ and _changes file_ must be in JSON format and are placed in _example_ folder in the project's root directory
- Execute mixtape CLI in root directory<br/> `node dist/index.js mixtapeCLI -d <data> -c <changes> -o [output]`
  example: <br/>`node dist/index.js mixtapeCLI -d mixtape.json -c changes.json -o output.json`
- The `output.json` will be saved in _example_ folder

## Future Improvement for Scalability

**Current Limitation**
The current V1.0.0 implementation uses multiple loops to iterate over the array structure in `mixtape.json` to perform CRUD. However, if the `mixtape.json` becomes very large, this approach will be very expensive and inefficient, leading to high CPU and memory usage.

**Potential Solution V2.0.0** <br/> - Reconstruct input `mixtape.json` data structure

- After ingesting and parsing input `mixtape.json`, the data structure of `users`, `playlists`, and `songs` are all array of objects, which means performing CRUD such as `add_song_to_playlist` requires at least a loop (linear time) to search for the corresponding `playlist_id` in `playlists` to add a new song. This approach is very inefficient when iterating over a large number of `playlists` or executing multiple times of `add_song_to_playlist`.
- To improve efficiency, we can restructure arrays of objects to a **map**. For example, we can create a `userIdsMap` that maps to the users' `id`, a `playlistsIdsMap` that maps to the playlists' `id` <br/> `userIdsMap = {1: { name: "Albin Jaye"}, 2: { name: "Dipika Crescentia"} }` <br/>`playlistIdsMap = {1: { owner_id: '3', song_ids: [1,2] }, 2: {...} } `
- Converting to a map allows CRUD operation to execute in constant time. We no longer need to iterate over the `playlists` array to search for a playlist. Instead, we can leverage map's `.get`, `.has`, and other methods to efficiently access a specified key's value or check for existence.
- After executing the different types of changes in `changes.json`, these map objects need to be converted back to the original array of objects structure to match the `mixtape.json` file.
- The downside of the V2.0.0 approach is it sacrifices space complexity since creating multiple map objects requires extra memory allocation. However, the application gains more performance in terms of time complexity. Instead of creating a loop every time the application processes a change in `changes.json`, it only needs to iterate over the `mixtape.json` twice to convert the structure and reverse. This is much more performant when `changes.json` scales up.

**Extension** <br/>- Streaming parser to read `mixtape.json` & `changes.json` <br/> - Custom decoder <br/> - Breaking up into smaller files <br/> - Utilize multiple workers to work on small chunk (Parallelization) <br/> - Exposing the changes action as a stateful rest webservice to process multiple change requests.
