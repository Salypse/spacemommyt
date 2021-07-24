const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to use this command');
    if (!message.guild.me.hasPermission("MANGE_ROLES")) return message.channel.send('i require \`MANAGE_ROLES\` permission to tempmute ');

    const muteRole = message.guild.roles.cache.find(r => r.name == "Muted");
    const memberRole = message.guild.roles.cache.find(r => r.name == "Member");
    const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ")
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been mute ${message.guild.name}.`)
      .addField(`Duration ${time}`, `Reason : ${reason}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send('You must state a member to tempmute with a duration of time \`-tempmute @member time reason\`');
    if (!muteRole) return message.channel.send('There is not a mute role in this server')
    if (!memberRole) return message.channel.send('There is not a member role in this server')
    if (!mentionMember) return message.channel.send('The member stated is not in the server');
    if (!mentionMember.roles.highest.posistion >= message.member.roles.highest.posistion) return message.channel.send('You cannot tempmute this member as they are the same role as you or higher');
    if (!time) return message.channel.send('You must state a duration of time \`-tempmute @member time reason\`');
    if (!reason) reason = 'No reason given';
 
    await mentionMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionMember.roles.remove(memberRole.id).catch(err => console.log(err));
    await mentionMember.send(tempmuteEmbed).catch(err => console.log(err));

    setTimeout(async function () {
      await mentionMember.roles.add(memberRole.id).catch(err => console.log(err));
      await mentionMember.roles.remove(muteRole.id).catch(err => console.log(err));
      await mentionMember.send(`Your mute has been lifted in ${message.guild.name}`).catch(err => console.log(err));
    }, ms(time));
  }
}