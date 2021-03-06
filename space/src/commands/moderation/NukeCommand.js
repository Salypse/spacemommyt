const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {
    //permissions:
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You cannnot use this command")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have the manage channels permission")

    //variables:
    let reason = args.join(" ");
    const nukeChannel = message.channel;


    //input check:
    if (!reason) reason = "No reason given";
    if (!nukeChannel.deletable) return message.channel.send("This channel is not deletable");


    //exectuting:
    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));

  }
}