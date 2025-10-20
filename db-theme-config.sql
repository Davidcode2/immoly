INSERT into config_theme (config_id, theme_id) VALUES
  (1, (SELECT id FROM theme WHERE name = 'green-mist-dark')),
  (2, (SELECT id FROM theme WHERE name = 'hearth-stone-dark')),
  (3, (SELECT id FROM theme WHERE name = 'blue-dream-dark')),
  (4, (SELECT id FROM theme WHERE name = 'green-mist-light')),
  (5, (SELECT id FROM theme WHERE name = 'blue-dream-light')),
  (6, (SELECT id FROM theme WHERE name = 'blue-dream-dark'));
