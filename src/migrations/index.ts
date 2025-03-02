import * as migration_20250302_005101_initial from './20250302_005101_initial';

export const migrations = [
  {
    up: migration_20250302_005101_initial.up,
    down: migration_20250302_005101_initial.down,
    name: '20250302_005101_initial'
  },
];
