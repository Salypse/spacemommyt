const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js')

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    

    const mentionedMember = message.mentions.members.first();
    const role = message.guild.roles.cache.find(r => r.name == "Staff")

    if (mentionedMember) {
      if (mentionedMember.roles.cache.has(role.id)) {
        const noEmbed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} please do not ping this role`)
          .setColor('RED')
        await message.reply(noEmbed).catch(err => console.log(err));
      }
    }

    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}