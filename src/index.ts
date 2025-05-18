#!/usr/bin/env node
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer, { type DistinctQuestion } from 'inquirer';
import { birthdayMessages } from './messages';
import { animate } from './animations';
import { fetchWisdom } from './api';
import type { Wisdom } from './types';


process.on('uncaughtException', (error) => {
  console.error(chalk.redBright('\nErreur critique :'), chalk.yellow(error.message));
  console.log(chalk.dim('\nRéessayez avec --debug pour plus de détails'));
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.redBright('\nPromesse rejetée :'), chalk.yellow(reason));
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\nAnnulation... Joyeux anniversaire quand même ! 🎉'));
  process.exit(0);
});

const args = process.argv.slice(2);
const nameArg = args.find(arg => arg.startsWith('--name='))?.split('=')[1] || 'Friend';
const debugMode = args.includes('--debug');

const displayBirthdayMessage = async (abortController: AbortController) => {
    try {
      console.log(birthdayMessages.asciiArt(nameArg));
      
      await animate.sparkle(`🎉 ${nameArg}'s Birthday Bash! 🎊`, abortController);
  
      const wisdomQuestion: DistinctQuestion = {
        type: 'confirm',
        name: 'wisdom',
        message: 'Voulez-vous recevoir votre sagesse spéciale du jour ?',
        default: true
      };
  
      const { wisdom } = await inquirer.prompt([wisdomQuestion], { 
        signal: abortController.signal 
      });
  
      if (wisdom) {
        const wisdomData = await fetchWisdom();
        animate.displayWisdom(wisdomData);
      }
  
      const candlesQuestion: DistinctQuestion = {
        type: 'confirm',
        name: 'blowCandles',
        message: 'Soufflez les bougies ? 🎂',
        default: true
      };
  
      const { blowCandles } = await inquirer.prompt([candlesQuestion], { 
        signal: abortController.signal 
      });
  
      if (blowCandles) {
        console.log(gradient.cristal('\n🎉🎉🎉 Toutes les bougies sont éteintes ! Joyeux anniversaire ! 🎉🎉🎉'));
      }
  
    } catch (error) {
      if (error instanceof Error && error.message.includes('aborted')) {
        console.log(chalk.yellow('\nAnnulation...'));
        process.exit(0);
      }
      throw error;
    }
  };

  const run = async () => {
    const abortController = new AbortController();
    
    try {
      await displayBirthdayMessage(abortController);
      process.exit(0);
    } catch (error) {
      if (debugMode) {
        console.error(chalk.red('\n[DEBUG] Erreur détaillée :'));
        console.error(error);
      } else {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        console.error(chalk.red('\nUne erreur est survenue :'), chalk.yellow(message));
      }
      
      console.log(chalk.dim(`
  Conseils de dépannage :
  1. Vérifiez votre connexion Internet
  2. Réessayez avec --name=VotreNom
  3. Ajoutez ${chalk.bold('--debug')} pour les détails techniques`));
      
      process.exit(1);
    }
  };

run();