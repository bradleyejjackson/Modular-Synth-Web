# Modular Synth Patch School

A browser version of the Patch School lessons from the Modular Synth plugin. Patch modules together, play them with your computer keys or a MIDI keyboard, and work through all 69 lessons, Song mode ones included, in the browser.

**Play it:** https://bradleyejjackson.github.io/modular-synth-web/

The site is two files: `index.html` is the whole page, and `sw.js` lets it work offline. The page is generated from the plugin's own lessons, modules and presets, so it is updated by regenerating it rather than by editing it here.

## Saving patches

The lab keeps the rack and lesson progress in the browser's local storage, plus a list of named patches (My patches). Ctrl+Z and Ctrl+Shift+Z (or Ctrl+Y) undo and redo changes to the rack. Export file writes a patch as JSON (`"kind": "modular-synth-web-patch"`, modules with their changed knobs, and cables as `[from module, output, to module, input]`); Import file reads one back. Copy share link puts the same JSON, deflated and base64url-encoded, after `#patch=` in the address. A Notes module's words go with it (`"text"`). Modules the lab doesn't have are left out when a patch is opened.

## Links and the course map

The address names what to show: `#lab`, `#chords`, `#song`, `#modules` or `#presets` for a tab, `#lesson-4.6` for a lesson (picking a lesson puts it in the address, so Back goes to the one before), `#module-filter` for a card on Every module (the `#` by each module's name is its link), and `#patch=...` for a shared patch. Course map, under the lesson picker, lists every part with its ticks and a done total, and Reset my progress clears the ticks without touching the rack, My patches or songs.

## Song mode and the Track editor

The Song mode tab is a small copy of the standalone app's Song page: up to 8 tracks, each with 8 patterns (loops of 1, 2, 4 or 8 bars, notes in beats as `[start, note, length, velocity]`), a 128-bar arranger (a pattern run plays from its first bar and loops), a mixer with a Master level and meter, and 4 automation lanes a track. Each track has a Track editor like the plugin's: a piano roll (or a drum grid with the Drum Kit's names), grid, velocity, key with Show key and Snap to key, and chord pads with Triads/7ths and a Shape (Smooth keeps the voicing close to the chord before). The chord names of what's written show along the top. My songs keeps named songs in this browser, and Export WAV renders the song through fresh copies of the synths, named after the song.

Edit on a track opens its synth in the Patch lab with a banner saying so: every change to the rack goes back into the track, its loop is in the Track editor under the keyboard (Play loop plays it through the lab's synth), and Stop editing puts your own rack back. With no track open, that Track editor holds the lab's own loop. Notes in the song and the loop start on their exact sample. Lessons that start from an empty rack stop editing first.

## Modules

The lab plays all of the plugin's 157 modules. The Acid Sequencer's strip sets each step's note (drag it up or down, or use the arrow keys) and its On, Slide and Accent switches; the Spectrum draws its bars from the latest 1024 samples; a Notes module's words are kept with the patch. MIDI Out and CC Out send to a Web MIDI output picked on their panel (kept in this browser, with Nowhere to turn them off): another instrument, or a virtual cable into a DAW. Mute ends any notes MIDI Out left playing. The Arpeggiator plays the keys held on the lab's keyboard, newest last.

## Blocks and module help

Like the plugin, modules can be folded into a block: one box with just the jacks and knobs you pick. Shift-click (or Ctrl-click) module titles, or drag a box around them on an empty part of the rack, then press Fold into block… (Ctrl+G); its window also lists every module with a tick box, so it works on a phone or from the keyboard. MIDI In and Output stay outside. Dragging the title of one selected module moves them all. A block's **+** unfolds it, and **save** keeps it under My blocks in the Add module menu (Manage My blocks… deletes them). A block sounds the same as the modules inside it. In a patch file or share link a block is `{ "type": "block", "x", "y", "block": { "name", "mods", "cables", "inputs": [{ "label", "ports": [[module, port]] }], "outputs", "knobs": [{ "label", "mod", "param" }] } }`, with modules named by their place in the block's list; pages from before blocks skip them.

The **?** button above the rack is the plugin's module help: while it's lit, resting the mouse on a module's title, a knob or a jack (or Tabbing to a jack or knob) shows what it does or what the jack carries. It starts off and is kept in this browser with the other settings.

## Keyboard, theme and sound

Jacks work from the keyboard: Tab to a jack and press Enter or Space to pick it, then Enter on a jack of the other kind connects them. Escape lets go, and Delete unplugs a focused jack. Every message also goes to a screen reader's live region, and each jack's label says what it's plugged into. The ☾/☀ button in the header switches between light and dark (it starts by following the computer), and Cables on top draws the cables over the modules instead of behind them; both are kept in this browser along with the Volume slider. The engine soft-limits its output, so Volume sets the loudest the lab can be, and the scope shows LIMIT when a patch is loud enough for the limiter to squash it.

## Phones, installing and offline

On one column (a tablet or phone) the step you're on is repeated in a strip just above the rack's buttons, with Show me and Back to the lesson, and Start lesson scrolls to it. Under 700 px wide the presets, saving and Audio In rows fold behind More tools; under 600 px the keyboard shows one octave so the keys are about 40 px wide. On a touch screen the computer-key letters and their hint are hidden.

The page is installable (Add to Home Screen, or Install in Chrome and Edge): a script near the top makes the web app manifest as a blob and its icons as canvas PNGs, and the favicon is an inline SVG. `sw.js` is the offline copy: a service worker that keeps the page and the Google fonts in a cache, fetching the page fresh when online and serving the cached one when not. Page updates are picked up on the next online visit. Save for offline (in Lesson 1.1) also downloads the page as one file, which works with no internet since the page fetches nothing else.

## Browsers

Works in a recent Chrome, Edge, Firefox or Safari on a computer. Press Start sound first. A USB MIDI keyboard works in Chrome, Edge and Opera; Firefox asks for a site permission first; Safari has no Web MIDI.
