const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class SuggestCommand extends BaseCommand {
  constructor() {
    super('suggest', 'fun', ['suggestion']);
  }

  async run(client, message, args) {
    let suggestion = args.join(' ');
    if (!args[0]) return message.channel.send('You must state something to suggest');
    const embed = new Discord.MessageEmbed()
      .setTitle('Suggestion:')
      .addField(`Suggestion: ${suggestion}`, `This was suggested by ${message.author}`);

    message.channel.send(embed).then(sentMessage => sentMessage.react('👍')).then(reaction => reaction.message.react('👎'))
  }
}