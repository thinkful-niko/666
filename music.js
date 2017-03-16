var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};


$(document).ready(function(){

			    //alert('toadfasdf uch')

			fetchTracks('0E2blcrvyduixEolxZXot7', function (data) {
				//console.log(data)    
				audioObject = new Audio(data.tracks.items[Math.floor(Math.random() * 10)].preview_url);
				//console.log(audioObject)
				//console.log(audioObject.src)
				//console.log($(audioObject).attr('src'))
				createTrackList(data); 
				//$('iframe').attr('src',  $(audioObject).attr('src'))
				//audioObject.play();

					

			 })


			/*$('.tracksList').on('click touchend',function(){
				audioObject.pause();
	
				console.log('yo')
				fetchTracks('0E2blcrvyduixEolxZXot7', function (data) {
					audioObject = new Audio(data.tracks.items[Math.floor(Math.random() * 10)].preview_url);
					console.log(audioObject);
					alert($(audioObject).attr('src'))
					$('iframe').attr('src',  $(audioObject).attr('src'))				

			    })


			})*/
		
			//$('iframe').attr('src',  $(audioObject).attr('src'))				
			

})


function createTrackList(data){ //Construct play list 
	console.log(data)
	console.log(data.tracks.items)
	var songs = data.tracks.items; 
	$(songs).each(function(e){
		console.log(this.preview_url, this.name, e);
		$('.tracks').append(
					'<div class="tracksList truncate" id="' + this.id + '" src="' + this.preview_url + '">' +
					'<span class="trackNumber">' + e + '.  </span><span class="trackName">' + this.name + '</span></div>')
	})
	//If Mobile 
	//
	
	$('.tracksList').on('click touch', function(e){
		$('iframe').remove(); //Remove all previous iframes. 

		var i = document.createElement('iframe');
		i.src =  $(this).attr('src');
		$(this).append(i);

	})
		
}





/*
$(document).ready(function(){



        $.mbAudio.sounds = {
            backgroundSprite: {
                id    : "backgroundSprite",
                ogg   : "sounds/bgndsSprite.ogg",
                mp3   : "sounds/bgndsSprite.mp3",
                //example of sprite
                sprite: {
                    intro     : {id: "intro", start: 80, end: 116.975, loop: true},
                    levelIntro: {id: "levelIntro", start: 63, end: 75.5, loop: true},
                    tellStory : {id: "tellStory", start: 80, end: 116.975, loop: true},
                    level1    : {id: "level1", start: 5, end: 13, loop: true},
                    level2    : {id: "level2", start: 40, end: 56, loop: true},
                    level3    : {id: "level3", start: 120, end: 136.030, loop: true}
                }
            },

            effectSprite: {
                id    : "effectSprite",
                ogg   : "sounds/effectsSprite.ogg",
                mp3   : "sounds/effectsSprite1.mp3",
                //example of sprite
                sprite: {
                    streak        : {id: "streak", start: 0, end: 1.3, loop: 3},
                    great         : {id: "great", start: 5.8, end: 8, loop: false},
                    divine        : {id: "divine", start: 10, end: 11.6, loop: false},
                    wow           : {id: "wow", start: 15, end: 20, loop: false},
                    levelIntro    : {id: "levelIntro", start: 20, end: 25, loop: false},
                    levelCompleted: {id: "levelCompleted", start: 25, end: 30, loop: false},
                    subLevelLost  : {id: "subLevelLost", start: 35, end: 38.1, loop: false},
                    subLevelWon   : {id: "subLevelWon", start: 30, end: 31.9, loop: false},
                    gameWon       : {id: "gameWon", start: 30, end: 31.9, loop: false}
                }
            }
        };





    fetchTracks('0E2blcrvyduixEolxZXot7', function (data) {
	audioObject = new Audio(data.tracks.items[Math.floor(Math.random() * 10)].preview_url);
	audioObject.play();

    })


	$('.node').click(function(){
	audioObject.pause();

		console.log('yo')
	    fetchTracks('0E2blcrvyduixEolxZXot7', function (data) {
		audioObject = new Audio(data.tracks.items[Math.floor(Math.random() * 10)].preview_url);
		audioObject.play();

	    })


	})

})

*/
