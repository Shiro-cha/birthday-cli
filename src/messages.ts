import figlet from 'figlet';
import gradient from 'gradient-string';

export const birthdayMessages = {
  asciiArt: (name: string) => gradient.pastel.multiline(
    figlet.textSync(`Happy Birthday ${name}!`, { font: 'Standard' })
  ),

  wishes: [
    '🎂 Another year of amazing adventures! 🚀',
    '🌟 May all your dreams turn into reality! ✨',
    '🎁 The best is yet to come! 🥂',
    '🎈 Life is a party - you\'re the guest of honor! 🥳'
  ]
};