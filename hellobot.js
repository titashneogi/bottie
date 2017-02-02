//Import request module
var request 	= require('request');
var Botkit		= require('botkit');
var CONTENT		= require('./content.json');

console.log(CONTENT);


   
var controller = Botkit.slackbot({
	debug: false
	//include "log: false" to disable logging
	//or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

var bot = controller.spawn({
	token: "xoxb-135765410051-oDOTg83VOYGdRsRr5ZtXQvLs",
}).startRTM()


/*
//Replace your token, channelID and text here
var path_to_call = 'http://slack.com/api/chat.postMessage?token=xoxb-135765410051-oDOTg83VOYGdRsRr5ZtXQvLs&user=U1ASBAE9H&channel=food_talks&text= <@U3ZC15YMV|jennyfoo>start';

request(path_to_call, function(error, response, body) {
	if (!error && response.statusCode == 200) { 
		console.log('Success');
	} else { 
		console.log(error);
	}
});
*/

bot.api.im.open({
        user: 'U3ZC15YMV'
    }, (err, res) => {
        if (err) {
            bot.botkit.log('Failed to open IM with user', err)
        }
        console.log(res);
        bot.startConversation({
            user: 'U3ZC15YMV',
            channel: 'C3BP0GLDD',
            text: 'TRAINING TIME!!!'
        }, (err, convo) => {
	        convo.ask('TRAINING TIME!!!',function(response,convo) {
		        console.log("----------------loop enter----------------", response);
		        convo.next();
		        var i = 0;
				(function init(){
					if(CONTENT.topic.length === i){
						console.log("-------------looop complete=============");
						return true;
					} else {
						convo.ask(CONTENT.topic[i],function(response,convo) {
							i++;
							init();
							convo.next();
							
						});
					}
				})();
		    });
        });
    })

controller.on('bot_message', function(speech, message) {
	console.log('++++++++++++++++++++++++++++++++++',message);
	speech.reply(message, 'Hmm... I don\'t have a response what you said... I\'ll save it and try to learn about it later.');
});