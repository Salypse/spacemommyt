const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to use this command');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to mute');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.find(r => r.name == "Muted");
    const memberRole = message.guild.roles.cache.find(r => r.name == "Member");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
    .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted ${reason}`)
      .setColor("#fc2403")
      .setTimestamp();

    if (!muteRole) return message.channel.send('There is not a mute role in this server')
    if (!memberRole) return message.channel.send('There is not a member role in this server')
    if (!args[0]) return message.channel.send('\`-unmute @member reason\`');
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me with my own command');
    if (!reason) reason = 'No reason given';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This member is already unmuted.');
    if (message.member.roles.highest.positsion <= mentionedMember.roles.highest.positsion) return message.channel.send('You cannot unmute someone of the same role or higher');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the unmute role')));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the mute role')));
  }
}