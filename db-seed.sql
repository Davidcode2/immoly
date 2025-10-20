-- 2. Insert configs
INSERT INTO config (customer_id) VALUES
 ('f2c802e1-7cd6-454f-b245-b7a9def5507e'),
 ('fdec68e8-ed41-4b8d-a5dd-37ce22af7eea'),
 ('f73ed7b1-3660-4c13-8802-f7667dc90c46'),
 ('7c8ede1d-27c0-46fa-97f7-bf0e956727bb'),
 ('17f195d5-6f81-418f-8be5-58fa4618851e'),
 ('39232117-5bfb-4b61-8ee4-afd78917c6bc');

-- 3. Insert themes 

-- green-mist-light
INSERT INTO theme (
  name, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'green-mist-light', 
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

-- green-mist-dark
INSERT INTO theme (
  name, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'green-mist-dark',
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

-- blue-dream-light
INSERT INTO theme (
  name, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'blue-dream-light',
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

-- blue-dream-dark
INSERT INTO theme (
  name, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'blue-dream-dark',
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
  name, background, foreground, ultra_accent, dark_accent,
  neutral_accent, accent, strong_accent, light_accent, ultralight_accent, muted_accent,
  grey_accent, "primary", "secondary", success, dark_success, alert
) VALUES (
  'hearth-stone-dark', 
  'hsl(10, 99%, 1%)'  ,
  'hsl(10, 13%, 12%)' ,
  '#f5f5dc'           ,
  '#6b4c4c'           ,
  '#a0522d'           ,
  '#d2b48c'           ,
  'hsl(30, 53%, 42%)' ,
  'hsl(30, 85%, 41%)' ,
  'hsl(30, 8%, 60%)'  ,
  'hsl(30, 15%, 55%)' ,
  '#fffaf0'           ,
  '#deb887'           ,
  '#f5deb3'           ,
  'hsl(120, 40%, 60%)',
  'hsl(120, 40%, 50%)',
  '#ff4500'
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

-- 4. Insert theme_config relations

