
var serialRunner = require('Serial').SerialRunner;
var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var https = require('https');
var section =['Verbal'];
var section_hierarchy =[];
var topics_videos =[];

console.log('-----------Scraper started---------------');

request({
    method:'GET',
    uri:'https://gre.magoosh.com/lessons?utm_source=greblog&utm_medium=blog&utm_campaign=grelessons&utm_term=menu&utm_content=lessons'
    })
    .then(function (response){        
         var $ = cheerio.load(response);
         var link;        
         for(var k=0; k < section.length; k++){
            var section_item = section[k];  
            console.log('Extracting links for:'+section[k]+'...');
            var section_array = $('h2:contains("'+section_item+'")').parent().parent().find('h4')
             for (var i = 0; i < section_array.length; i++){
                    section_hierarchy.push({                                                        
                        'section':section_item,
                        'subsection':$(section_array[i]).html(),
                        'link':'https://gre.magoosh.com/'+section_array.siblings('ul').eq(i).find('a').first().attr('href')
                        });  
                }    
         }
        
    })
    .catch(function (err){
        
    })
    .done(function(){
        console.log(section_hierarchy);
        var promises = [];
        var videoDownloadPromises =[];
            section_hierarchy.forEach(function(obj){
                promises.push(new Promise(function(resolve,reject){
                    request({
                        method:'GET',
                        uri:obj.link
                    }).then(response => {                  
                        resolve({
                                "data":response,
                                "subsection":obj.subsection,
                                "section":obj.section
                                })})
                      .catch(err => {
                          reject(err);
                      })
                    }))
                });

/** CREATE DIRECTORIES FOR DOWNLOADING VIDEO FILES**/
                var root_dir =__dirname+'\\Files\\';
                //console.log(topics_videos);
                section.forEach(sec =>{
                    fs.readdir(root_dir+sec,(err,files)=>{
                        if(err){
                            fs.mkdir(root_dir+sec,err => {
                               // console.log('Section Directory Created.!'+sec)
                            });
                        }
                       
                    });
                });
               // console.log(section_hierarchy);
                section_hierarchy.forEach(obj=>{
                    fs.readdir(root_dir+obj.section+'\\'+obj.subsection,(err,files)=>{
                        if(err){
                            //console.log('mkddir'+root_dir+obj.section+'/'+obj.subsection)
                            fs.mkdir(root_dir+obj.section+'\\'+obj.subsection,err => {
                               // console.log('Subsection created'+obj.subsection)
                            });
                        }
                       
                    });
                });
/** END CREATE DIRECTORIES FOR DOWNLOADING VIDEO FILES**/
        Promise.all(promises)
            .then(responses => {
                var $;    
                responses.forEach(function(res){                    
                    $ = cheerio.load(res.data);  
                    $('h4').last().next().find('div[class="lesson-item-thumb"]').each((a,b)=>{
                        var link = $(b).find('img').attr('src').toString();
                       console.log(link);
                        topics_videos.push({
                            section:res.section,
                            subsection:res.subsection,
                            topic:$(b).next().html(),
                            video_link:link.substring(0,link.lastIndexOf('/'))+'/web_webm.webm'
                        });
                    })
                }) 
            })
            .catch(err => {
             
            })
            .done(function(){
                
                var runner = new serialRunner();

                topics_videos.forEach(obj =>{
                  //  console.log(root_dir+obj.section+"/"+obj.subsection+"/"+obj.topic+".webm");
                   // console.log(obj.video_link);
                    // videoDownloadPromises.push(new Promise(function(resolve,reject){
                    //    // var file = fs.createWriteStream(root_dir+obj.section+"/"+obj.subsection+"/"+obj.topic+".webm");
                        
                    //     request(obj.video_link)
                    //         .pipe(fs.createWriteStream(root_dir+obj.section+"/"+obj.subsection+"/"+obj.topic+".webm"))
                    //         .on('finish',function(){
                    //             resolve(obj.topic+'.....downloaded');
                    //         })
                    //     // var request = https.get(obj.video_link, function(response) {
                    //     //   response.pipe(file);
                    //     // });    	
                    // }));

                    // Promise.each(videoDownloadPromises,function(confirmation){
                    //     console.log(confirmation);
                    // })
                    runner.add(function(obj,callback){                   
                        request(obj.video_link)
                                // .on('connect',function(){
                                //   file =  fs.createWriteStream(root_dir+obj.section+"/"+obj.subsection+"/"+obj.topic+".webm");
                                // })fs.createWriteStream(root_dir+obj.section+"/"+obj.subsection+"/"+obj.topic+".webm")
                                // .on('error',function(){
                                //     console.log(err);
                                // })
                                .on('connect',function(){
                                    console.log('Connecting to download:'+obj.topic+'...');
                                })
                                .pipe(fs.createWriteStream(root_dir+obj.section+"/"+obj.subsection+"/"+obj.topic+".webm"))
                                .on('error',function(err){
                                    console.log(err);
                                })
                                .on('finish',function(){                                  
                                    console.log(obj.topic+'.....downloaded');
                                    callback();
                                })                                    

                    },obj);

                                       
            
                })
                runner.run(function(){
                    console.log("done");
                });
                runner.onError(function(err) {
                    runner.stop(); // stop further queued function from being run
                    console.log("There was an error",err);
                  });   
            });

    });
