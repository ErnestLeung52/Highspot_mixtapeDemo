# Mixtape Highspot Assignment

A command-line utility to modify a mixtape data set based on changes. The application ingests an input file (mixtape.json in the example folder) containing information about users, songs, and playlists along with a changes file (changes.json in the example folder) containing a set of change actions . It then creates and saves an output file (output.json in the example folder) that contains the changes made to the input file.

# Requirements

**Suggested minimum versions:**
node --version
**Platform**
Developed and tested under ...

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

- _Data file_ and _changes file_ must be in JSON format and are placed in _example_ folder in project's root directory
- Execute mixtape CLI in root directory<br/> `node dist/index.js mixtapeCLI -d <data> -c <changes> -o [output]`
  example: <br/>`node dist/index.js mixtapeCLI -d mixtape.json -c changes.json -o output.json`
- Output file will be saved in _example_ folder

## Future Improvement

**Scalability**
Current implmentation uses multiple loops to parse and iterate over the `mixtape.json` to find the corresponding data. However, if the `mixtape.json` becomes very large, this approach will be very expensive, leading to high cpu and memory usage.

**Potential Solution**

1. `add_song_to_playlist` changes action requires a look up to `playlists` in `mixtape.json` to obtain the matching playlist's `id`. Although this operation takes linear time to perform, this operation becomes intensive when we need to process large amount of data and need to invoke this action many times. To improve, we can create `playlistsIdsMap` that maps to the playlist's `id`. For example, `const playlistIdsMap = {1: { owner_id: '3', song_ids: [1,2] }}`. Implementing a map instead of looping over an array of object allows us to quickly access the targeted playlist in constant time. This works well with any actions that require look up to a specific playlist ( e.g. `remove_playlist` ). The approach can be applied to `users` and `songs` in `mixtape.json` as well.

2. Other ideas (need review) <br/> - Streaming parser to read `mistape.json` & `changes.json` <br/> - Custom decoder <br/> - Breaking up into smaller files <br/> - Utilize multiple workers to work on small chunk <br/> - Following `map` solution and store it in a key/value storage (NoSQL) to avoid in-memory loading. <br/> - Sort `map` based on `id` <br/> - Parallelization (multi-thread) <br/> - Exposing the changes action as a stateful rest webservice to process multiple change requests.
