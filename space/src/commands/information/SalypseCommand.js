const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SalypseCommand extends BaseCommand {
  constructor() {
    super('salypse', 'information', []);
  }

  async run(client, message, args) {
   const twitterEmbed = new Discord.MessageEmbed()
      .setTitle('Salypse Twitter')
      .setURL('https://twitter.com/RealGusherBoy')
      .setThumbnail('https://img-premium.flaticon.com/png/512/124/124021.png?token=exp=1622999999~hmac=cab0a00a3c3dc7d0b1d6b42b30ee690b')
      .setColor('#1DA1F2')
      .addField('Check out Salypse\'s Twitter', 'Gusher Boy is Poggers')
      .setTimestamp()
      .setFooter("Salypse", "https://pbs.twimg.com/profile_images/1335100546269782016/19oEvk7b_400x400.jpg");
    const twitchEmbed = new Discord.MessageEmbed()
      .setTitle('Salypse\'s Twitch')
      .setURL('https://www.twitch.tv/salypse')
      .setThumbnail('https://assets.help.twitch.tv/Glitch_Purple_RGB.png')
      .setColor('#6441a5')
      .addField('Check out Salypse\'s Twitch', 'Best Rampart Main on Twitch')
      .setTimestamp()
      .setFooter("Salypse", "https://static-cdn.jtvnw.net/jtv_user_pictures/f6e995e0-c995-4092-92af-5ba889936190-profile_image-300x300.png");
    
    await message.channel.send(twitterEmbed).catch(err => console.log(err));
    await message.channel.send(twitchEmbed).catch(err => console.log(err));
  }
}