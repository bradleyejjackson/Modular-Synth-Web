# Modular Synth Patch School

A browser version of the Patch School lessons from the Modular Synth plugin. Patch modules together, play them with your computer keys or a MIDI keyboard, and work through all 49 lessons and 22 module workshops, Song mode ones included, in the browser.

**Play it:** https://bradleyejjackson.github.io/modular-synth-web/

The site is two files: `index.html` is the whole page, and `sw.js` lets it work offline. The page is generated from the plugin's own lessons, modules and presets, so it is updated by regenerating it rather than by editing it here.

## Saving patches

The lab keeps the rack and lesson progress in the browser's local storage, plus a list of named patches (My patches). Ctrl+Z and Ctrl+Shift+Z (or Ctrl+Y) undo and redo changes to the rack. Export file writes a patch as JSON (`"kind": "modular-synth-web-patch"`, modules with their changed knobs, and cables as `[from module, output, to module, input]`); Import file reads one back. Copy share link puts the same JSON, deflated and base64url-encoded, after `#patch=` in the address. A Notes module's words go with it (`"text"`). Modules the lab doesn't have are left out when a patch is opened.

## Blocks and module help

Like the plugin, modules can be folded into a block: one box with just the jacks and knobs you pick. Shift-click (or Ctrl-click) module titles, or drag a box around them on an empty part of the rack with the mouse, then press Fold into block… (Ctrl+G); its window also lists every module with a tick box, so it works on a phone or from the keyboard. MIDI In and Output stay outside. Dragging the title of one selected module moves them all. A block's **+** unfolds it, and **save** keeps it under My blocks in the Add module menu (local storage `modular-synth-patch-school-blocks-v1`; Manage My blocks… deletes them). In the rack a block is a module `{ type: 'block', block: { name, mods, cables, inputs, outputs, knobs } }`: each input jack lists the ports inside its cable feeds, each output is one port inside, and each knob names a module inside and its knob. The modules inside keep their uids, and `enginePatch` unfolds every block (blocks inside blocks too) before the engine sees the patch, so a block sounds the same as its modules. In a patch file or share link a block is `{ "type": "block", "x", "y", "block": { "name", "mods", "cables", "inputs": [{ "label", "ports": [[module, port]] }], "outputs", "knobs": [{ "label", "mod", "param" }] } }`, modules named by their place in the block's list; pages from before blocks skip them.

Above the rack is one row of buttons: Add module and its search, Undo and Redo, Tidy up, the **Rack** menu (Fold into block…, Cables on top, Load Init patch, Clear rack), the **Patch** menu (Presets, My patches, Save and Delete, Export file, Import file, Copy share link) and **?**. The menus are `<details class="menu">` elements: every button keeps its id, so the lessons' Show me and checks don't care which menu it sits in; a button inside closes its menu, a select keeps it open. Audio In hears and Sidechain In hears sit in a row of their own that `paintSrc()` shows only while the rack has an Audio In or Sidechain In module (or a source is already picked). The cable colour key and the drag hint sit under the rack.

The **?** button above the rack is the plugin's module help: while it's lit, resting the mouse on a module's title, a knob or a jack (or Tabbing to a jack or knob) shows what it does or carries. The words come from `MODULE_HELP`, and what each jack carries from the plugin's `kindRules`. It starts off and is kept with the other settings.

## Links and the course map

The address names what to show: `#lab`, `#chords`, `#song`, `#modules`, `#glossary` or `#presets` for a tab, `#lesson-4.6` for a lesson (picking a lesson puts it in the address, so Back goes to the one before), `#module-filter` for a card on Every module (the `#` by each module's name is its link), and `#patch=...` for a shared patch. Course map, under the lesson picker, lists every part with its ticks and a done total, and Reset my progress clears the ticks without touching the rack, My patches or songs. Once `SYNC_URL` is set (the licence server's address), the course map also offers **Sign in** with a Patch School Pro licence key: the ticks are then kept in that key's account too and stay in step with the app. The key and the last synced copy are kept in local storage `modular-synth-patch-school-account`.

## Eurorack glossary

The Glossary tab is the plugin's Help > Eurorack glossary: the words on hardware panels and in manuals (CV, gate, 1 V/oct, normalled, LPG, EOC...), then what each module is called on a Eurorack panel, grouped like Every module, with a search box. Each card on Every module and each module's ? help also has its "In Eurorack" line. Both come from the plugin's EurorackNames.cpp, which names generic kinds of module only, never a maker.

## Song mode and the Track editor

The Song mode tab is a small copy of the standalone app's Song page: up to 8 tracks, each with 8 patterns (loops of 1, 2, 4 or 8 bars, notes in beats as `[start, note, length, velocity]`), a 128-bar arranger (a pattern run plays from its first bar and loops), a mixer with a Master level and meter, and 4 automation lanes a track. Each track has a Track editor like the plugin's: a piano roll (or a drum grid with the Drum Kit's names), grid, velocity, key with Show key and Snap to key, and chord pads with Triads/7ths and a Shape (Smooth keeps the voicing close to the chord before). The chord names of what's written show along the top. My songs keeps named songs in this browser, and Export WAV renders the song through fresh copies of the synths, named after the song.

Edit on a track opens its synth in the Patch lab with a banner saying so: every change to the rack goes back into the track, its loop is in the Track editor under the keyboard (Play loop plays it through the lab's synth), and Stop editing puts your own rack back. With no track open, that Track editor holds the lab's own loop. Notes in the song and the loop start on their exact sample. Lessons that start from an empty rack stop editing first.

## Modules

The lab plays all of the plugin's 162 modules. Like the plugin, pitch is 1 V per octave and every other signal counts 1 as 5 V, and a cable keeps its volts: `cableGain` in the page scales a cable from any other kind of jack into a pitch jack by 5, and one out of a pitch jack by 1/5, reading which jacks are pitch from `MODULE_HELP`. The Slew works as the plugin's does (a share of the way each sample), so a pitch glides the same either way. The Sample Player records from its Rec In jacks while its Rec button is lit (or its Rec jack is high): the engine (`Engine.record`, like the plugin's `Engine::feedRecorders`) posts each finished take to the page as a `take` message, which loads it like a file (kept until the page is reloaded). The Multisample's panel picks a sound and a root note for each of its 8 zones. The Acid Sequencer's strip sets each step's note (drag it up or down, or use the arrow keys) and its On, Slide and Accent switches; the Spectrum draws its bars from the latest 1024 samples, and the XY Scope X against Y; a Notes module's words are kept with the patch. MIDI Out and CC Out send to a Web MIDI output picked on their panel (kept in this browser, with Nowhere to turn them off): another instrument, or a virtual cable into a DAW. Mute ends any notes MIDI Out left playing. The Arpeggiator plays the keys held on the lab's keyboard, newest last.

## Keyboard, theme and sound

Jacks work from the keyboard: Tab to a jack and press Enter or Space to pick it, then Enter on a jack of the other kind connects them. Escape lets go, and Delete unplugs a focused jack. Every message also goes to a screen reader's live region, and each jack's label says what it's plugged into. The ☾/☀ button in the header switches between light and dark (it starts by following the computer), and Cables on top draws the cables over the modules instead of behind them; both are kept in this browser along with the Volume slider. The engine soft-limits its output, so Volume sets the loudest the lab can be, and the scope shows LIMIT when a patch is loud enough for the limiter to squash it.

## Phones, installing and offline

On one column (a tablet or phone) the step you're on is repeated in a strip just above the rack's buttons, with Show me and Back to the lesson, and Start lesson scrolls to it. The toolbar wraps to two rows, and the Rack and Patch menus work the same at every width; under 600 px the keyboard shows one octave so the keys are about 40 px wide. On a touch screen the computer-key letters and their hint are hidden.

The page is installable (Add to Home Screen, or Install in Chrome and Edge): a script near the top makes the web app manifest as a blob and its icons as canvas PNGs, and the favicon is an inline SVG. All three, and the header logo, are the Patch School "P slate" mark in its free colours (dark tile, orange cable; the tile turns light in the dark theme). The header's "Patch School" wordmark is Outfit 600 turned into SVG paths, so the page loads no extra font. `sw.js` is the offline copy: a service worker that keeps the page and the Google fonts in a cache, fetching the page fresh when online and serving the cached one when not. Browsers only take a service worker from its own file, so **publishing copies three files to Modular-Synth-Web: `index.html`, `README.md` and `sw.js`**. Bump `CACHE` in `sw.js` only if its caching changes; page updates are picked up on the next online visit. Save for offline (in Lesson 1.1) also downloads the page as one file, which works with no internet since the page fetches nothing else.

## Browsers

Works in a recent Chrome, Edge, Firefox or Safari on a computer. Press Start sound first. A USB MIDI keyboard works in Chrome, Edge and Opera; Firefox asks for a site permission first; Safari has no Web MIDI.
