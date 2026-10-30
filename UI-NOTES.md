# Shipping workspace UI

The homepage has been restored to the repository's original design at the user's
request: original markup, top navigation, dark background, title and turquoise
hover animation. The Taste redesign below now applies only to Shipping Requests.
The earlier Home inspection notes describe the replaced redesign.

Taste direction: Achromatic ledger, seed 439941513. No redraws.
Selected for long sessions managing requests: neutral chrome keeps attention on
the work. The blue-grey ground takes its face from shipping paperwork; the
parcel mark and request-numbered cards give the workspace its identity.

The board answers: which requests need to move next? The three status lanes are
the signature element. Home answers: where do I manage shipping requests?

Data inventory: 20 existing client requests; string IDs; company names;
descriptions; three statuses; order within each status; counts derived from
the same arrays as the cards; no invented deadlines, owners, metrics or activity.
The sample companies and descriptions remain in `src/Board.js` and should be
replaced when real data is connected. Refresh intentionally resets frontend state.

## Visual critique

1. The board is the largest region; its title and pending count are read first.
2. Three equal columns and two 12px gutters fill the canvas. Empty lanes retain
   their drop areas because all initial requests must be in Backlog.
3. Chrome is neutral; blue and green encode status on moved requests. Geist is
   confirmed loaded by the inspector. The parcel mark names the product.
4. Lane totals and pending totals derive from state, always summing to 20.
5. Empty counts display 0. Drop prompts explain what belongs in empty lanes.
6. No charts or legends are needed; lane headings supply the status context.
7. On phones, navigation becomes two top links and the board scrolls horizontally
   within its frame. Request names and descriptions remain readable.

The first visual pass caught wrapped mobile columns and small sublines; the
second corrected both. Desktop still has deliberately empty destination lanes.
This is a functional constraint, not space to fill with invented data.

## Validation

- Six tests pass, including reorder, status colors, counts of requests, and tab retention.
- Production build succeeds with the legacy OpenSSL compatibility option.
- Board inspector: 0 failures at 1440, 768 and 390 pixels; one warning for empty
  destination lanes, retained as usable drop targets.
- Source lint: 0 failures; shadow warning applies only to the floating drag mirror.
- Browser interaction: moved a request into In Progress and Complete and verified
  counts and color; Home and its board action preserve the moved request.
- Inspector screenshots and measurements are local in `.taste-skill/` (ignored).
- Home inspector: 0 failures at all three widths. Its three space warnings reflect
  a short orientation screen with a single board action, deliberately capped for
  readability instead of adding duplicate request data or decorative statistics.

Remaining limitation: moving cards uses Dragula pointer/touch gestures; keyboard
reordering was not added in this UI restyle.
