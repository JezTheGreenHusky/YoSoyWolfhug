
window.addEventListener("load", () => {
    let modal = document.getElementById("modal-btn");
    setTimeout(() => {
        modal.click();
    }, 2000);

    /*======================
    -----------
    YouTube
    -----------
    ======================*/
    let module_yt = (async() => {
        // para el id de wolfhug
        //https://www.googleapis.com/youtube/v3/videos?id=bgP-TrB1j00&key=AIzaSyBXZZCJ8Uo25Raihi2QJQTmdY1bWAjbOEw&part=id,snippet,contentDetails,statistics,topicDetails
        let channel_details_url = "https://www.googleapis.com/youtube/v3/channels?id=UC189sYpAW3JTAeo_pwDlf3w&key=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=id,snippet,contentDetails,statistics,topicDetails";
        //let vid_list_url = "https://www.googleapis.com/youtube/v3/search?channelId=UC189sYpAW3JTAeo_pwDlf3w&key=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=id,snippet&maxResults=10";
        let vid_masVisto = "https://www.googleapis.com/youtube/v3/search?channelId=UC189sYpAW3JTAeo_pwDlf3w&order=viewCount&key=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=id,snippet&maxResults=1";
        let vid_ultimo = "https://www.googleapis.com/youtube/v3/search?channelId=UC189sYpAW3JTAeo_pwDlf3w&order=date&key=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=id,snippet&maxResults=1";
        
        //let vid_details_url = "https://www.googleapis.com/youtube/v3/videos?id=UC189sYpAW3JTAeo_pwDlf3w&key=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=snippet,contentDetails,statistics,status"

        let request = await fetch(channel_details_url);
        let respuesta = await request.json();

        let suscriptores = respuesta.items[0].statistics.subscriberCount;
        let videos = respuesta.items[0].statistics.videoCount;
        let visualizaciones = respuesta.items[0].statistics.viewCount;

        // ultimo video
        let request2 = await fetch(vid_ultimo);
        let respuesta2 = await request2.json();
    
        let lista_busqueda = respuesta2.items;

        //console.log(lista_busqueda)

        let vid_id = lista_busqueda[0].id.videoId;
        let titulo = lista_busqueda[0].snippet.title
        let video_obj = document.getElementById("youtube_ultimo");
        
        if(vid_id != undefined){
            video_obj.innerHTML = `
            <div>
                <div class="centrar_xy">
                    <iframe src="https://www.youtube.com/embed/${vid_id}" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                </div>
                <h4 class="text-center fs-5 pt-2">${titulo}</h4>
            </div>
            `;    
        }

        // video mas visto
        let request3 = await fetch(vid_masVisto);
        let respuesta3 = await request3.json();
    
        let busqueda = respuesta3.items;

        let vid_id2 = busqueda[0].id.videoId;
        let titulo2 = busqueda[0].snippet.title
        let video_obj3 = document.getElementById("youtube_masVisto");

        if(vid_id != undefined){
            video_obj3.innerHTML = `
                <div>
                    <div class="centrar_xy">
                        <iframe src="https://www.youtube.com/embed/${vid_id2}" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                    </div>
                    <h4 class="text-center fs-5 pt-2">${titulo2}</h4>
                </div>
            `;    
        }


        // https://www.youtube.com/embed/wpB8uWVXoQg





        //animate numbers
        // https://www.bing.com/videos/search?q=animated+number+counter+javascript&view=detail&mid=5D5FA4C8861A33D4A55D5D5FA4C8861A33D4A55D&FORM=VIRE
        const animacion = () => {
            const counters = document.querySelectorAll(".counter");
            const speed = 200;

            counters.forEach((counter) => {
                const updateCount = () => {
                    let target;
                    if(counter.getAttribute('data-titulo') == 'suscriptores'){
                        target = suscriptores;
                    } else if(counter.getAttribute('data-titulo') == 'videos_totales'){
                        target = videos;
                    } else if (counter.getAttribute('data-titulo') == 'visualizaciones'){
                        target = visualizaciones;
                    }
                    const count = +counter.innerText;
    
                    const increment = target / speed;
    
                    if(count < target){
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 7);
                    } else {
                        count.innerText = target;
                    }
                }

                updateCount();
            });
        }

        animacion();

        let twiter = async() => {
            const baseTwitterSearchUrl3 = 'https://jezproxy.herokuapp.com/https://api.twitter.com/2/users?ids=1176919160737161216&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld,public_metrics&expansions=pinned_tweet_id'


            const defaultFetchOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALwwaAEAAAAAy6jPwq2fA%2BZDuQH%2F7jDaX3AyhJg%3DxT14MK9vWqCVhK59iN1NbjzDWSev1jjaJ3631XPhDHdnBJzuHY',
                },
            };
            let peticion = await fetch(baseTwitterSearchUrl3, defaultFetchOptions)
            let respuesta = await peticion.json();
            
            console.log(respuesta)
            respuesta = respuesta.data[0]

            
            let description = respuesta.description;
            let name = respuesta.name;
            let profile_image_url = respuesta.profile_image_url;
            let followers_count = respuesta.public_metrics.followers_count;
            let following_count = respuesta.public_metrics.following_count;
            let tweet_count = respuesta.public_metrics.tweet_count;
            
            //document.querySelector(".twitter_card img").src = profile_image_url;
            document.querySelector(".twitter_card h3").innerText = name;
            document.querySelector(".twitter_card p").innerText = description;

            document.getElementById("tw-seguidores").innerText = followers_count;
            document.getElementById("tw-siguendo").innerText = following_count;
            document.getElementById("tw-tweets").innerText = tweet_count;

            let peticion2 = await fetch('https://jezproxy.herokuapp.com/https://twitter.com/Yo_Soy_Wolfhug/photo', defaultFetchOptions)
            let respuesta3 = await peticion2.json();
            
            console.log(respuesta3)
        }

        twiter()
    })();

});