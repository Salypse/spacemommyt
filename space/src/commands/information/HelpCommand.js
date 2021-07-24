const Discord = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'information', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
      .setTitle('Bot help sections')
      .setColor('GREEN')
      .setDescription('Use -help sectionName to access another section.\nSections:\ninformation\nfun\ntool')
      .addField('Fun Commands', 'Commands that all users can use that are fun and have no purpose')
      .addField('Information Commands', 'Information on the server or its members')
      .addField('Moderation Commands', 'Commands that are for moderation purposes within a server')
      .addField('Tool Commands', 'Commands that add features to the servers')
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    const infoEmbed = new Discord.MessageEmbed()
      .setTitle('Information Commands')
      .addField('Help Commands', 'This command shows the user all the commands possible')
      .addField('Salypse Command', 'Check out Salypse\'s socials')
      .addField('Falingo Command', 'Check out Falingo\'s socials')
      .addField('Vote Command', 'Vote on two topics')

    const funEmbed = new Discord.MessageEmbed()
      .setTitle('Fun Commands')
      .addField('Avatar Commands', 'Returns a user avatars')
      .addField('Meme Command', 'Returns a meme to the channel')
      .addField('Snipe Command', 'Returns the last deleted message within a channel')
      .addField('Suggest Command', 'Leave your suggestions for the server');
    const moderationEmbed = new Discord.MessageEmbed()
      .setTitle('Moderation Commands')
      .addField('Ban Command', 'Bans a member from the server')
      .addField('Kick Command', 'Kicks a member from the server')
      .addField('Lock Command', 'Locks a channel in the server')
      .addField('Mute Command', 'Mutes a member in the server')
      .addField('Nickname Command', 'Changes a members nickname in the server')
      .addField('Nuke Command', 'Clones a channel and deletes the old one')
      .addField('Purge Command', 'Purges messages within a channel')
      .addField('Recruit Command', 'Recruits a member to the staff team in a server')
      .addField('Tempban Command', 'Temporarily bans a member from the server')
      .addField('Tempmute Command', 'Temporarily mutes a member in the server')
      .addField('Unban Command', 'Unbans a member from the server')
      .addField('Unlock Command', 'Unlocks a channel in the server')
      .addField('Unmute Command', 'Unmutes a member in the server')

    const toolEmbed = new Discord.MessageEmbed()
      .setTitle('Tool Commands')
      .addField('Verify Command', 'Gives the user the member role in the server')

    if(!args[0]) return message.channel.send(sectionEmbed);
    if (args[0] == 'information') return message.channel.send(infoEmbed);
    else if (args[0] == 'fun') return message.channel.send(funEmbed);
    else if (args[0] == 'tool') return message.channel.send(toolEmbed);
    else if (args[0] == 'moderation') return message.channel.send(moderationEmbed);
  }
}