-- Remaining seeded copy without dashes
update spots set description = 'A freshwater basin below sea level, warm and mineral. Local pods train here all year. The Kinneret crossing is a quiet Israeli classic.'
  where slug = 'kinneret';
update spots set description = 'Leander swam it. Byron swam it. The Dardanelles still runs a hard east west current between Asia and Europe, and the annual crossing keeps the myth in the water.'
  where slug = 'hellespont';
update spots set hazards = 'Cliff jump offs, boat wake, sun'
  where slug = 'santorini';
update spots set description = 'Circumnavigate the island with the tide as your engine. Forty six kilometres of river, harbour and East River, and a city that barely notices you are there.'
  where slug = 'manhattan';
update events set notes = 'Zurich to Rapperswil. Feeding from escort. Water typically 20 to 22°C.'
  where title = 'Length of the lake';
