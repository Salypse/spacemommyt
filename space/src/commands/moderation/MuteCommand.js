const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to use this command');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to mute');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.find(r => r.name == "Muted");
    const memberRole = message.guild.roles.cache.find(r => r.name == "Member");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
    .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted ${reason}`)
      .setColor("#fc2403")
      .setTimestamp();

    if (!args[0]) return message.channel.send('\`-mute @member reason\`');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
    if (!muteRole) return message.channel.send('There is not a mute role in this server')
    if (!memberRole) return message.channel.send('There is not a member role in this server')
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me with my own command');
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This member is already muted.');
    if (message.member.roles.highest.positsion <= mentionedMember.roles.highest.positsion) return message.channel.send('You cannot mute someone of the same role or higher');

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the mute role')));
    await mentionedMember.roles.remove(member.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the mute role')));
  }
}