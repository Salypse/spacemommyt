const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SalypseCommand extends BaseCommand {
  constructor() {
    super('falingo', 'information', []);
  }

  async run(client, message, args) {
   const twitterEmbed = new Discord.MessageEmbed()
      .setTitle('Falingo\'s Twitter')
      .setURL('https://twitter.com/RealFalingo')
      .setThumbnail('https://img-premium.flaticon.com/png/512/124/124021.png?token=exp=1622999999~hmac=cab0a00a3c3dc7d0b1d6b42b30ee690b')
      .setColor('#1DA1F2')
      .addField('Check out Falingos\'s Twitter', 'Who eats a taco like that')
      .setTimestamp()
      .setFooter("Falingo", "https://pbs.twimg.com/profile_images/1400200193497255943/4spvpurt_400x400.png");
    const twitchEmbed = new Discord.MessageEmbed()
      .setTitle('Falingo\'s Twitch')
      .setURL('https://www.twitch.tv/Falingo_')
      .setThumbnail('https://assets.help.twitch.tv/Glitch_Purple_RGB.png')
      .setColor('#6441a5')
      .addField('Check out Falingo\'s Twitch', 'Best Funky Friday Player')
      .setTimestamp()
      .setFooter("Falingo", "https://pbs.twimg.com/profile_images/1400200193497255943/4spvpurt_400x400.png");
    
    await message.channel.send(twitterEmbed).catch(err => console.log(err));
    await message.channel.send(twitchEmbed).catch(err => console.log(err));
  }
}