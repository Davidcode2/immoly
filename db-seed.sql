-- 2. Insert configs
INSERT INTO config (customer_id) VALUES
  ('8fb30cb0-8620-4102-8d81-cc1c233e86d0'),
  ('d6be6e65-b6c3-4122-9547-6c2c9648c75d');

-- 3. Insert themes for each customer (config IDs 1 and 2)

-- Acme Corp: green-mist-light
INSERT INTO theme (
  name, config_id, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'green-mist-light', 1,
  'hsl(129, 22%, 69%)',         -- primary
  'hsl(1, 0%, 100%)',           -- background
  'hsl(194, 33%, 12%)',         -- foreground
  NULL,                         -- ultra_accent (not in light theme)
  'hsl(194, 33%, 18%)',         -- dark_accent
  'hsl(194, 33%, 22%)',         -- neutral_accent
  'hsl(195, 37%, 40%)',         -- accent
  'hsl(180, 55%, 31%)',         -- strong_accent
  'hsl(172, 25%, 55%)',         -- light_accent
  'hsl(172, 25%, 95%)',         -- ultralight_accent
  'hsl(172, 15%, 35%)',         -- muted_accent
  'hsl(172, 10%, 80%)',         -- grey_accent
  'hsl(129, 22%, 69%)',         -- primary
  'hsl(95, 32%, 82%)',          -- secondary
  'hsl(120, 40%, 60%)',         -- success
  'hsl(120, 40%, 50%)',         -- dark_success
  'hsl(20, 70%, 60%)'           -- alert
);

-- Acme Corp: green-mist-dark
INSERT INTO theme (
  name, config_id, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'green-mist-dark', 1,
  'hsl(129, 22%, 69%)',         -- primary
  '#0a0a0a',                    -- background
  '#ededed',                    -- foreground
  'hsl(194, 13%, 12%)',         -- ultra_accent
  'hsl(194, 33%, 18%)',         -- dark_accent
  'hsl(194, 33%, 22%)',         -- neutral_accent
  'hsl(195, 37%, 40%)',         -- accent
  'hsl(180, 55%, 31%)',         -- strong_accent
  'hsl(172, 25%, 55%)',         -- light_accent
  'hsl(102, 35%, 90%)',         -- ultralight_accent
  'hsl(172, 15%, 55%)',         -- muted_accent
  'hsl(172, 8%, 60%)',          -- grey_accent
  'hsl(129, 22%, 69%)',         -- primary
  'hsl(95, 32%, 82%)',          -- secondary
  'hsl(120, 40%, 60%)',         -- success
  'hsl(120, 40%, 50%)',         -- dark_success
  'hsl(20, 70%, 60%)'           -- alert
);

-- Blue Sky: blue-dream-light
INSERT INTO theme (
  name, config_id, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'blue-dream-light', 2,
  '#99ccff',                    -- primary
  NULL,                         -- background (not set in light theme)
  '#001a33',                    -- foreground
  NULL,                         -- ultra_accent (not in light theme)
  '#003366',                    -- dark_accent
  'hsl(200, 53%, 42%)',         -- neutral_accent
  '#0066cc',                    -- accent
  'hsl(200, 85%, 41%)',         -- strong_accent
  '#66b2ff',                    -- light_accent
  '#f0f8ff',                    -- ultralight_accent
  'hsl(200, 15%, 55%)',         -- muted_accent
  'hsl(200, 8%, 60%)',          -- grey_accent
  '#99ccff',                    -- primary
  '#cce6ff',                    -- secondary
  'hsl(120, 40%, 60%)',         -- success
  'hsl(120, 40%, 50%)',         -- dark_success
  '#ff6200'                     -- alert
);

-- Blue Sky: blue-dream-dark
INSERT INTO theme (
  name, config_id, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'blue-dream-dark', 2,
  '#99ccff',                    -- primary
  '#0a0a0a',                    -- background
  '#ffffff',                    -- foreground
  'hsl(200, 13%, 12%)',         -- ultra_accent
  '#002d67',                    -- dark_accent
  'hsl(200, 53%, 42%)',         -- neutral_accent
  '#0066b3',                    -- accent
  'hsl(200, 85%, 41%)',         -- strong_accent
  '#66b2ff',                    -- light_accent
  '#f0f8ff',                    -- ultralight_accent
  'hsl(200, 15%, 55%)',         -- muted_accent
  'hsl(200, 8%, 60%)',          -- grey_accent
  '#99ccff',                    -- primary
  '#cce6ff',                    -- secondary
  'hsl(120, 40%, 60%)',         -- success
  'hsl(120, 40%, 50%)',         -- dark_success
  '#ff6200'                     -- alert
);

-- Hearth stone 
INSERT INTO theme (
  name, config_id, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'hearth-stone-dark', 2,
  '#99ccff',                    -- primary
  '#0a0a0a',                    -- background
  '#ffffff',                    -- foreground
  'hsl(200, 13%, 12%)',         -- ultra_accent
  '#002d67',                    -- dark_accent
  'hsl(200, 53%, 42%)',         -- neutral_accent
  '#0066b3',                    -- accent
  'hsl(200, 85%, 41%)',         -- strong_accent
  '#66b2ff',                    -- light_accent
  '#f0f8ff',                    -- ultralight_accent
  'hsl(200, 15%, 55%)',         -- muted_accent
  'hsl(200, 8%, 60%)',          -- grey_accent
  '#99ccff',                    -- primary
  '#cce6ff',                    -- secondary
  'hsl(120, 40%, 60%)',         -- success
  'hsl(120, 40%, 50%)',         -- dark_success
  '#ff6200'                     -- alert
);

  --background: #2f2b28;
  --background: hsl(10, 99%, 1%);
  --ultra-accent: hsl(10, 13%, 12%);
  --foreground: #f5f5dc;
  --dark-accent: #6b4c4c;
  --accent: #a0522d;
  --light-accent: #d2b48c;
  --neutral-accent: hsl(30, 53%, 42%);
  --strong-accent: hsl(30, 85%, 41%);
  --grey-accent: hsl(30, 8%, 60%);
  --muted-accent: hsl(30, 15%, 55%);
  --ultralight-accent: #fffaf0;
  --primary: #deb887;
  --secondary: #f5deb3;
  --success: hsl(120, 40%, 60%);
  --dark-success: hsl(120, 40%, 50%);
  --alert: #ff4500;
