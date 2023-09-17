CREATE TABLE `todo`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(255) NOT NULL ,
  `description`   TEXT NOT NULL ,
  `date_time` 	  DATETIME NOT NULL ,
  `done` 	  	  BOOL NOT NULL DEFAULT FALSE,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;

engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;

