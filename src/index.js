import { config } from "dotenv";
import { Client} from "discord.js";

config();

const client = new Client({intents:['Guilds','GuildMembers','Guilds','GuildMessages','GuildVoiceStates','GuildModeration','GuildMessages']});
const TOKEN = process.env.BOT_TOKEN
client.login(TOKEN); 


let roleName = 'Escape';
let roleColor = 'Red';
let resetTimer = true;

client.on("guildCreate", guild => {
        guild.roles.create({ 
            name: roleName,
            color:roleColor,
        });

})

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { 
    const currentChannel = newVoiceState.guild.channels.cache.find(ch => ch.name === newVoiceState.channel.name);
        if (newVoiceState.channel && newVoiceState.member.roles.cache.find(role => role.name === roleName && resetTimer && currentChannel.members.size > 1) ) {
            new Promise((resolve, reject) => {
                resetTimer = false;
            const differentChannels = newVoiceState.guild.channels.cache.filter(ch => ch.type === 2 && ch.name !== newVoiceState.channel.name);
            const changedChannel =  differentChannels.first(); 
           currentChannel.members.forEach( member => {
            member.voice.setChannel(changedChannel);
            });
        }, 5000).then( () =>{
            resetTimer = true;
        });
     }else{
        resetTimer = true;
     } 
});



