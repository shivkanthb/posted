Botlytics
=========

Node module for Botlytics API.

Visit the official HTTP docs [here](http://botlytics.api-docs.io/)

## Installation

  `npm install botlytics`


## Usage
```
var botlytics = require('botlytics');

var bot_token ="";  // Include your bot token here. 

botlytics.setBotToken(bot_token);  
```  
  
  This sets the bot token for our function calls.

#### Parameters
- `text` (string, required) is the content of the message.
- `conversation_identifier` (string, optional) is a unique string that will organize messages into conversations with your bot and others. Examples of this might be a conversation ID or a group name.
- `sender_identifier` (string, optional) is a unique string that will track who sent which messages. Examples of this might be a user ID or a phone number.
- `platform` (string, optional) is the platform that the message was sent on. Examples include "slack", "messenger", "kik".
- `payload` (string, optional) is the payload for complex messages that include more than just text.
  
##### Incoming Message
```
botlytics.incoming({text: <message>, conversation_identifier: <conversation_id>, ... }, function(err, response, body){} );
```
##### Outgoing Message
```
botlytics.outgoing({text: <message>, conversation_identifier: <conversation_id>, ... }, function(err, response, body){} );
```  
        
## Example
```
var botlytics = require('botlytics');

botlytics.setBotToken('XXXXXXXXXXXX');

var dict = {
    text: "Hello!",
    conversation_identifier: "conv_99980",
    sender_identifier: "sender_123",
    platform: "kik"
};

botlytics.incoming(dict, function(err,res, body){
    if(err) throw Error(err);
    console.log(body);
});
```
 This outputs :
 ```
{
  "text": "Hello!",
  "kind": "incoming",
  "created_at": "2016-05-07T04:42:58.129Z"
}
```  
## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.