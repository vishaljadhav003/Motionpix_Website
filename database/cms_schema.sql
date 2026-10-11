-- ============================================================
-- MotionPix CMS — schema addition
-- Run this on your EXISTING `motionpix` database.
-- It only ADDS two new tables; nothing already in your DB is touched.
--
-- How to run (same mysql client you used in your screenshot):
--   mysql -u root
--   use motionpix;
--   source D:/MotionPix/myapp/database/cms_schema.sql;
-- ============================================================

USE motionpix;

-- Generic text/content store for any editable field on any page.
-- One row = one editable piece of text, addressed by (page, section, content_key).
CREATE TABLE IF NOT EXISTS site_content (
  id            INT(11) NOT NULL AUTO_INCREMENT,
  page          VARCHAR(50)  NOT NULL,   -- e.g. 'home', 'about', 'contact'
  section       VARCHAR(50)  NOT NULL,   -- e.g. 'hero', 'intro'
  content_key   VARCHAR(100) NOT NULL,   -- e.g. 'hero_title'
  content_value TEXT,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_content (page, section, content_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Team members shown on the About page. Fully admin-editable list
-- (add / edit / delete / reorder / change photo) instead of a hardcoded array.
CREATE TABLE IF NOT EXISTS team_members (
  id             INT(11) NOT NULL AUTO_INCREMENT,
  name           VARCHAR(100) NOT NULL,
  role           VARCHAR(150),
  location       VARCHAR(100),
  about          TEXT,
  photo          VARCHAR(255),           -- filename inside backend/uploads/
  display_order  INT(11) DEFAULT 0,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
