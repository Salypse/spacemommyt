const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VoteCommand extends BaseCommand {
  constructor() {
    super('vote', 'information', []);
  }

  async run(client, message, args) {
    const filter = m => m.author.id == message.author.id;
    let embed = new Discord.MessageEmbed()
      .setFooter(`Vote made by ${message.author.tag}`)


    message.channel.send('What is the vote topic?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
      embed.setTitle(msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('You ran out of time, Re-run command')
    }

    message.channel.send('What is the first to point to vote?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
      embed.addField('[🟢]The first option to vote:', msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('You ran out of time, Re-run command')
    }

    message.channel.send('What is the second point to vote?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
      embed.addField('[⚪]The second option to vote:', msg.first().content);
    } catch (err) {
      console.log(err);
      message.channel.send('You ran out of time, Re-run command')
    }
    message.channel.send(embed).then(sentMessage => sentMessage.react('🟢')).then(reaction => reaction.message.react('⚪'));
  }
}