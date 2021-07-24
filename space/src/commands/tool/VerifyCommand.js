const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require("discord.js")

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tool', []);
  }

  async run(client, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I require `MANAGE_ROLES` permission")

   const role = message.guild.roles.cache.find(r => r.name == "Member");

   await message.member.roles.add(role.id).catch(err => console.log(err));

   message.delete();
  }
}