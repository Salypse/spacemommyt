// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const role = member.guild.roles.cache.find(r => r.name == "Member");
    await member.roles.add(role.id).catch(err => console.log(err));

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name == 'welcome');
    welcomeChannel.send(`<@${member.user.id}> welcome to ${member.guild.name}`);
    
  }
}