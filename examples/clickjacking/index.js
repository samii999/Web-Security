import { concurrently } from 'concurrently';
import chalk from 'chalk';

const attackerPort = process.env.PORT || 4000;
const victimPort = +attackerPort + 100;

console.log(
  '💀',
  `${chalk.bgRed('Attacker')}: ${chalk.red(`http://localhost:${attackerPort}`)}`
);

console.log(
  '🎯',
  `${chalk.bgBlue('Victim')}: ${chalk.blue(`http://localhost:${victimPort}`)}`
);

const { result } = concurrently([
  {
    command: 'node attacker.js',
    name: 'attacker',
    env: {
      PORT: attackerPort.toString(),
      VICTIM_PORT: victimPort.toString(),
    },
  },
  {
    command: 'node victim.js',
    name: 'victim',
    env: {
      PORT: victimPort.toString(),
    },
  },
]);

result.catch((error) => {
  console.error('Error running servers:', error);
  process.exit(1);
});
