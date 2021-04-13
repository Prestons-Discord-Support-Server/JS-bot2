const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Online! ✅'));

// ================= START BOT CODE
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const Discord = require("discord.js");
const bot = new Client();
const prettyMilliseconds = require("pretty-ms");
const Database = require("@replit/database")
const db = new Database()
const Statcord = require("statcord.js");
const statcord = new Statcord.Client({
    client,
    key: "statcord.com-l3Lz0bcqM0dVLg7o125Z",
    postCpuStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
});

client.on('ready', ready => {
  console.log('Managing ' + client.user.tag)
})

const botPrefix = 'P.'
const botLibrary = 'Discord.js'

//varibles
var OwnerID = "730898397862559766"
var testingServerInvite = "https://discord.gg/SkdFttHE"
var testingServerID = "798952982015246358"
//tags

//other varibles


client.on("ready", async () => {
    // Start auto posting
    statcord.autopost();
});
statcord.on("autopost-start", () => {
    // Emitted when statcord autopost starts
    console.log("Statcord: Started autopost");
});

statcord.on("post", status => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Statcord: Successful post");
    else console.error('Statcord: ' + status);
});

//mention for info
client.on('message', message => {
if(message.mentions.users.first()) {
      if(message.mentions.users.first().id === '830861718145335307') {
          const embed = new MessageEmbed()
          .setDescription('My prefix is ' + botPrefix)
          .addField('Say ' + botPrefix +'help for my commands', ':)')
          message.channel.send(embed)
     }
}
});

//help command
client.on('message', message => {
	if (message.content === botPrefix + 'help') {
		statcord.post();
		const embed = new MessageEmbed()
			.setTitle('Commands')
			.setColor(0xff0000)
			.setDescription(
				'ping command - `' + botPrefix + 'ping` \n bot status command - `' + botPrefix + 'status` \n \n ** Owner cmds  **\n     eval - `' + botPrefix + 'eval <code>`\n Shutdown - `' + botPrefix + 'shutdown` \n \n \n Library: \n \`\`\`' + botLibrary + '\`\`\` \n Prefix: \n \`\`\`' + botPrefix + '\`\`\`'
			)
      .setFooter('made by \<\/\ℙ\𝚛\𝚎\𝚜\𝚝\𝚘\𝚗\𝒯\⑤\⓿\⓿\>\#9649')
		message.channel.send(embed);
	}
});

//status command
client.on('message', message => {
if (message.content === botPrefix + 'status') {
		statcord.post();
const embed = new MessageEmbed()
.setTitle("Bot status")
.addField('Bot Uptime', prettyMilliseconds(client.uptime))
.addField('1.0 version \(original version\)',' https://discord.com/api/oauth2/authorize?client_id=809619011553591337&permissions=8&scope=bot ')
.setFooter('made by \<\/\ℙ\𝚛\𝚎\𝚜\𝚝\𝚘\𝚗\𝒯\⑤\⓿\⓿\>\#9649')
message.channel.send(embed)
}
})

//Ping command
client.on('message', message => {
	if (message.content === botPrefix + 'ping') {
		statcord.post();
	  const embed = new MessageEmbed()
	  .setTitle(`Ping`)
	  .setColor(`RANDOM`)
		.setDescription(
			`🏓Latency is ${Date.now() -
				message.createdTimestamp}ms. API Latency is ${Math.round(
				client.ws.ping
			)}ms`)
			message.channel.send(embed)
	;
	}
});

//eval command
client.on('message', message => {
	if (message.author.id === '730898397862559766') {
		if (message.content.startsWith(botPrefix + 'eval')) {
			const evalMessageContent = message.content;
			var full = evalMessageContent.split(botPrefix + 'eval ')[1];
			const { member, channel, content } = message;
			try {
				const result = eval(content.replace(botPrefix + 'eval ',''));
				const evalEmbed = new MessageEmbed().setTitle(`Eval`).setDescription('Input: \n \`\`\`' + full + '\`\`\` \n \n Output: \`\`\`' + result + "\`\`\`").setColor('0xff0000').setAuthor('User: ' + message.author.tag)
				message.channel.send(evalEmbed)
				console.log("\n \n --Eval Input: " +  message.content + "\n --Eval Output: " + result);
			} catch (error) {
			  	console.error("\n \n Error! \n --Eval input: " + message.content + "\n --Eval error:" + error)
				message.channel.send("Error:`" + error + "`");
			}
		}
	}
});

//shutdown command
client.on('message', message => {
	if (message.author.id === '730898397862559766') {
		if (message.content.startsWith(botPrefix + 'shutdown')) {
		statcord.post();
			process.exit();
		}
	}
});

//BOT TOKEN
const DiscordToken = process.env['DISCORD_TOKEN']
client.login(DiscordToken);