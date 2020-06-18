import * as SQLite from 'expo-sqlite';
import logger from '../../../utils/logger';

const create_note_table_sql = `
CREATE TABLE IF NOT EXISTS \`notes\` (
    \`id\` INTEGER PRIMARY KEY,
    \`user_id\` TEXT DEFAULT '',
    \`text\` TEXT DEFAULT '',
    \`remark\` TEXT DEFAULT '',
    \`create_at\` INTEGER DEFAULT 0,
    \`update_at\` INTEGER DEFAULT 0,
    \`update_times\` INTEGER DEFAULT 0,
    \`search_result\` TEXT DEFAULT NULL
);
`;

const create_history_table_sql = `
CREATE TABLE IF NOT EXISTS \`histories\` (
    \`id\` INTEGER PRIMARY KEY,
    \`user_id\` TEXT DEFAULT '',
    \`text\` TEXT DEFAULT '',
    \`context\` TEXT DEFAULT NULL,
    \`create_at\` INTEGER DEFAULT 0,
    \`update_at\` INTEGER DEFAULT 0,
    \`update_times\` INTEGER DEFAULT 0,
    \`search_result\` TEXT DEFAULT NULL
);
`;

const database = SQLite.openDatabase('noob-dictionary');

database.exec([
  { sql: create_note_table_sql, args: [] },
  { sql: create_history_table_sql, args: [] },
], false, () => {
  logger.log('table init successed');
});

export default database;
