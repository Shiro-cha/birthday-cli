import chalk from 'chalk';
import gradient from 'gradient-string';
import type { Wisdom } from './types';

const confettiChars = ['✨', '🎉', '🎈', '🎁', '🥳', '🎊'];

export const animate = {


  sparkle: async (text: string) => {
    const sparkleGradient = gradient.atlas;
    const sparkles = ['✨', '🌟', '⚡', '❄', '★'];
    
 
    const baseText = sparkleGradient(text);
    console.log(baseText);
    

    for (let i = 0; i < 10; i++) {
      const sparklePos = Math.floor(Math.random() * text.length);
      const sparkleChar = sparkles[Math.floor(Math.random() * sparkles.length)];
      
      const leftPart = text.substring(0, sparklePos);
      const rightPart = text.substring(sparklePos + 1);
      const sparkledText = sparkleGradient(leftPart) + 
                          chalk.bold(sparkleChar) + 
                          sparkleGradient(rightPart);
      
      process.stdout.write('\x1B[1A\x1B[K'); 
      console.log(sparkledText);
      
      await new Promise(r => setTimeout(r, 300));
    }
    
    process.stdout.write('\x1B[1A\x1B[K');
    console.log(baseText);
  },

  displayWisdom: (wisdom: Wisdom) => {
    console.log(chalk.bgHex('#4a00e0').white('\n  🎇 Sagesse du jour 🎇'));
    console.log(chalk.hex('#00b4d8')(`\n  📜 ${wisdom.quote}`));
    console.log(chalk.hex('#ff758f')(`\n  💡 ${wisdom.advice}`));
    console.log(chalk.hex('#ffd166')(`\n  🐱 ${wisdom.funFact}\n`));
  }
};