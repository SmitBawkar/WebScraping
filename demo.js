
var https = require('https');
var fs = require('fs');

var arr = [ { section: 'Writing',
subsection: 'AWA Basics',
topic: 'Intro to AWA',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/b96bf671e7cfcf45ead80d457dc5b6d47112a7b1-video-491/web_webm.webm' },
{ section: 'Writing',
subsection: 'AWA Basics',
topic: 'Essay Organization',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/80061f0055f63d6074717fe55597a97adff4b970-video-498/web_webm.webm' },
{ section: 'Writing',
subsection: 'AWA Basics',
topic: 'Writing Tips',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/3d31bf71446433d1cf2a335856de637353541e29-video-499/web_webm.webm' },
{ section: 'Writing',
subsection: 'AWA Basics',
topic: 'Time Management',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/4ec0e67d2daf7cab9f6cd7f90e0d6a06a494faab-video-500/web_webm.webm' },
{ section: 'Writing',
subsection: 'Issue Task',
topic: 'Intro to Issue Task',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/7b1190b68ddcb623269e1193948418dcda02c839-video-493/web_webm.webm' },
{ section: 'Writing',
subsection: 'Issue Task',
topic: 'Issue Task Example',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/c970171589a5358eb4ea68218e059b1c816e0711-video-497/web_webm.webm' },
{ section: 'Writing',
subsection: 'Argument Task',
topic: 'Intro to Argument Task',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/1a0c182cf7c87582e099bf0efb131530c928cd49-video-492/web_webm.webm' },
{ section: 'Writing',
subsection: 'Argument Task',
topic: 'Logical Fallacies',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/d747861172ca99cce981228cd9817c6eb181a31f-video-494/web_webm.webm' },
{ section: 'Writing',
subsection: 'Argument Task',
topic: 'Argument Task Brainstorming',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/94513b9f545cc4a4d60d03ad0f38ffd494db2a8a-video-495/web_webm.webm' },
{ section: 'Writing',
subsection: 'Argument Task',
topic: 'Argument Task Example',
video_link: 'https://d296n67kxwq0ge.cloudfront.net/audio_video/002812aff59eb70b926416d242612bdf74f6b28c-video-4976/web_webm.webm' } ]


var root = __dirname+'/Files/';

// arr.forEach(obj => {
  console.log(root);
  fs.mkdir(root+'/adasas',function(err){
   if (err) {
      return console.error(err);
   console.log("Directory created successfully!");
  }});

  // fs.readdir(root+'/Files/Writing/Argument Task',function(err,files){
  //   if(err)
  //   {
  //     fs.mkdir(root+'/Files/Writing',(err)=>{
  //      return console.log(err);
  //     })
  //     console.log('dir created')
  //   }
  // })
// })

// var file = fs.createWriteStream("file.webm");
// var request = https.get("https://d296n67kxwq0ge.cloudfront.net/audio_video/002812aff59eb70b926416d242612bdf74f6b28c-video-4976/web_webm.webm", function(response) {
//   response.pipe(file);
// console.log('this is after the video');

// });
