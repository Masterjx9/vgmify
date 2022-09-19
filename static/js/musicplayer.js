let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let album = document.getElementById("album");
let platform = document.getElementById("platform");
let genre = document.getElementById("genre");
let year = document.getElementById("year");



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
// let All_song = [
//    {
//      name: "Sewer Dungeon",
//      path: "https://vgmsite.com/soundtracks/yakuza-like-a-dragon-unofficial-original-soundtrack-2020/vdyvhloczr/1-08.%20Sewer%20Dungeon.mp3",
//      img: "https://vgmsite.com/soundtracks/yakuza-like-a-dragon-unofficial-original-soundtrack-2020/1-Cover.jpg",
// 	 album: "Yakuza Like A Dragon Unofficial Original Soundtrack (PS4, PS5) (2020)",
// 	 artists: "test",
// 	 platform: "test",
// 	 year: "test",
// 	 genre: "test"
//    },
//    {
//      name: "second song",
//      path: "2.mp3",
//      img: "img2.jpg",
// 	 album: "Yakuza Like A Dragon Unofficial Original Soundtrack (PS4, PS5) (2020)",
// 	 artists: "test",
// 	 platform: "test",
// 	 year: "test",
// 	 genre: "test"
//    },
//    {
//      name: "third song",
//      path: "3.mp3",
//      img: "img3.jpg",
// 	 album: "Yakuza Like A Dragon Unofficial Original Soundtrack (PS4, PS5) (2020)",
// 	 artists: "test",
// 	 platform: "test",
// 	 year: "test",
// 	 genre: "test"
//    },
//    {
//      name: "fourth song",
//      path: "4.mp3",
//      img: "img4.jpg",
// 	 artists: "test",
// 	 platform: "test",
// 	 year: "test",
// 	 genre: "test"
//    },
//    {
//      name: "fifth song",
//      path: "5.mp3",
//      img: "img5.jpg",
// 	 album: "Yakuza Like A Dragon Unofficial Original Soundtrack (PS4, PS5) (2020)",
// 	 artists: "test",
// 	 platform: "test",
// 	 year: "test",
// 	 genre: "test"
//    }
// ];




// All functions


// function load the track
function load_track(index_no,checker){
	fetch('/grvgm')
	.then(response => response.json())
	.then(All_song => {
		console.log(All_song)

	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = "Title: "+All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
	track_image.style.cssText += "object-fit: contain;"
    artist.innerHTML = "Artists: "+All_song[index_no].artists;
	album.innerHTML = "Game: "+All_song[index_no].album;
	platform.innerHTML = "Console/Platform: "+All_song[index_no].platform;
	year.innerHTML = "Year: "+All_song[index_no].year;
	genre.innerHTML = "Genre: "+All_song[index_no].genre;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;

	if (checker == "next_song"){
		playsong();
	}
})
return;
}

load_track(index_no,"initial_load");


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  console.log(track)
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	console.log(track)
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	load_track(index_no,checker="next_song");
  };

        
    
	
	// if(index_no < All_song.length - 1){
	// 	index_no += 1;
	// 	load_track(index_no);
	// 	playsong();
	// }else{
	// 	index_no = 0;
	// 	load_track(index_no);
	// 	playsong();

	// }




// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#148F77";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
			// load_track(index_no);
			// playsong();
           if(autoplay==1){
			load_track(index_no,checker="next_song")
           }
	    }
     }