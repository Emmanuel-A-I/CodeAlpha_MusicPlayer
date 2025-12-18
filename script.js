
        
        // Step 1: My music library - I stored all song info here
        const songs = [
            {
                title: "Chike",
                artist: "Soldier",
                duration: 302, // in seconds
                src: "songs/song1.mp3",
                cover: "sol.jpg"
            },
            {
                title: "Someone",
                artist: "Chike",
                duration: 248,
                src: "songs/song2.mp3",
                cover: "chike2.jpg"
            },
            {
                title: "Available",
                artist: "Chike",
                duration: 316,
               src: "songs/song3.mp3",
                cover: "chike3.jpg"
            },
       
       
        ];
        
        // Step 2: Get all elements we need from HTML
        // I use these to control the player
        const audio = new Audio(); // This plays the music
        const songTitle = document.getElementById('songTitle');
        const songArtist = document.getElementById('songArtist');
        const songTime = document.getElementById('songTime');
        const albumImg = document.getElementById('albumImg');
        const playBtn = document.getElementById('playBtn');
        const playIcon = document.getElementById('playIcon');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');
        const progress = document.getElementById('progress');
        const currentTime = document.getElementById('currentTime');
        const totalTime = document.getElementById('totalTime');
        const volumeBar = document.getElementById('volumeBar');
        const volumeLevel = document.getElementById('volumeLevel');
        const autoplayToggle = document.getElementById('autoplayToggle');
        const playlist = document.getElementById('playlist');
        
        // Step 3: Set up player variables
        let currentSongIndex = 0; // Start with first song
        let isPlaying = false; // Player starts paused
        let autoplay = true; // Autoplay starts ON
        
        // Step 4: When page loads, set up the player
        window.addEventListener('load', function() {
            // Load first song
            loadSong(currentSongIndex);
            
            // Create playlist
            createPlaylist();
            
            // Set volume to 70%
            audio.volume = 0.7;
            volumeLevel.style.width = '70%';
        });
        
        // Step 5: Function to load a song
        function loadSong(index) {
            // Get the song from our array
            const song = songs[index];
            
            // Set audio source
            audio.src = song.src;
            
            // Update display
            songTitle.textContent = song.title;
            songArtist.textContent = song.artist;
            albumImg.src = song.cover;
            
            // Calculate minutes and seconds
            const mins = Math.floor(song.duration / 60);
            const secs = song.duration % 60;
            
            // Format time display
            const formattedTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            
            // Update time displays
            totalTime.textContent = formattedTime;
            songTime.textContent = `0:00 / ${formattedTime}`;
            currentTime.textContent = '0:00';
            
            // Reset progress bar
            progress.style.width = '0%';
            
            // Update playlist active item
            updatePlaylist();
        }
        
        // Step 6: Create playlist items
        function createPlaylist() {
            // Clear playlist first
            playlist.innerHTML = '';
            
            // Add each song to playlist
            songs.forEach(function(song, index) {
                // Create list item
                const li = document.createElement('li');
                
                // Calculate song length
                const mins = Math.floor(song.duration / 60);
                const secs = song.duration % 60;
                const formattedTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                
                // Add HTML content
                li.innerHTML = `
                    <i class="fas fa-play play-icon"></i>
                    <div class="song-details">
                        <div class="song-name">${song.title}</div>
                        <div class="artist-name">${song.artist}</div>
                    </div>
                    <div class="song-length">${formattedTime}</div>
                `;
                
                // Make it clickable
                li.addEventListener('click', function() {
                    currentSongIndex = index;
                    loadSong(currentSongIndex);
                    if (isPlaying) {
                        audio.play();
                    }
                });
                
                // Add to playlist
                playlist.appendChild(li);
            });
            
            // Update which song is active
            updatePlaylist();
        }
        
        // Step 7: Update active song in playlist
        function updatePlaylist() {
            // Get all playlist items
            const items = document.querySelectorAll('.playlist li');
            
            // Loop through items
            items.forEach(function(item, index) {
                if (index === currentSongIndex) {
                    // This is the current song
                    item.classList.add('active');
                } else {
                    // This is not the current song
                    item.classList.remove('active');
                }
            });
        }
        
        // Step 8: Play button click
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                // If playing, pause
                audio.pause();
                playIcon.className = 'fas fa-play';
                isPlaying = false;
            } else {
                // If paused, play
                audio.play();
                playIcon.className = 'fas fa-pause';
                isPlaying = true;
            }
        });
        
        // Step 9: Previous button click
        prevBtn.addEventListener('click', function() {
            // Go to previous song
            currentSongIndex--;
            
            // If at beginning, go to last song
            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1;
            }
            
            // Load the song
            loadSong(currentSongIndex);
            
            // If was playing, keep playing
            if (isPlaying) {
                audio.play();
            }
        });
        
        // Step 10: Next button click
        nextBtn.addEventListener('click', function() {
            // Go to next song
            currentSongIndex++;
            
            // If at end, go to first song
            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }
            
            // Load the song
            loadSong(currentSongIndex);
            
            // If was playing, keep playing
            if (isPlaying) {
                audio.play();
            }
        });
        
        // Step 11: Update progress bar as song plays
        audio.addEventListener('timeupdate', function() {
            if (!audio.duration) return;
            
            // Calculate progress percentage
            const percent = (audio.currentTime / audio.duration) * 100;
            
            // Update progress bar width
            progress.style.width = percent + '%';
            
            // Format current time
            const currentMins = Math.floor(audio.currentTime / 60);
            const currentSecs = Math.floor(audio.currentTime % 60);
            const currentFormatted = `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs}`;
            
            // Format total time
            const totalMins = Math.floor(audio.duration / 60);
            const totalSecs = Math.floor(audio.duration % 60);
            const totalFormatted = `${totalMins}:${totalSecs < 10 ? '0' : ''}${totalSecs}`;
            
            // Update time displays
            currentTime.textContent = currentFormatted;
            totalTime.textContent = totalFormatted;
            songTime.textContent = `${currentFormatted} / ${totalFormatted}`;
        });
        
        // Step 12: Click on progress bar to jump to position
        progressBar.addEventListener('click', function(e) {
            // Get width of progress bar
            const width = this.offsetWidth;
            
            // Get where user clicked
            const clickX = e.offsetX;
            
            // Calculate new time
            const newTime = (clickX / width) * audio.duration;
            
            // Set audio to that time
            audio.currentTime = newTime;
        });
        
        // Step 13: Volume control
        volumeBar.addEventListener('click', function(e) {
            // Get width of volume bar
            const width = this.offsetWidth;
            
            // Get where user clicked
            const clickX = e.offsetX;
            
            // Calculate new volume (0 to 1)
            const newVolume = clickX / width;
            
            // Set audio volume
            audio.volume = newVolume;
            
            // Update volume display
            volumeLevel.style.width = (newVolume * 100) + '%';
        });
        
        // Step 14: Autoplay toggle
        autoplayToggle.addEventListener('click', function() {
            // Toggle autoplay on/off
            autoplay = !autoplay;
            
            // Update toggle appearance
            this.classList.toggle('active');
        });
        
        // Step 15: When song ends
        audio.addEventListener('ended', function() {
            if (autoplay) {
                // If autoplay ON, play next song
                currentSongIndex++;
                if (currentSongIndex >= songs.length) currentSongIndex = 0;
                loadSong(currentSongIndex);
                audio.play();
            } else {
                // If autoplay OFF, stop playing
                isPlaying = false;
                playIcon.className = 'fas fa-play';
                progress.style.width = '0%';
                currentTime.textContent = '0:00';
            }
        });
    
