
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
        let channel_details_url = "https://www.googleapis.com/youtube/v3/channels?id=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=id,snippet,contentDetails,statistics,topicDetails";
        let vid_list_url = "https://www.googleapis.com/youtube/v3/search?channelId=AIzaSyCKzbklGd6MPoTOgbWkpr5DPn9hxlEK6SA&part=id,snippet&maxResults=10";
        let vid_details_url = "https://www.googleapis.com/youtube/v3/videos?id=PUGKbaHXU48&key=AIzaSyCg5jlzNYfMWaR0PYm2HYYEEI-jZ48_TF0&part=snippet,contentDetails,statistics,status"

        let request = await fetch(channel_details_url);
        let respuesta = await request.json();

        let suscriptores = respuesta.items[0].statistics.subscriberCount;
        let videos = respuesta.items[0].statistics.videoCount;
        let visualizaciones = respuesta.items[0].statistics.viewCount;

        // lista de videos
        let request2 = await fetch(vid_list_url);
        let respuesta2 = await request2.json();
    
        let lista_busqueda = respuesta2.items;
        lista_busqueda.forEach(element => {
            let vid_id = element.id.videoId;
            let titulo = element.snippet.title
            let video_obj = document.getElementById("youtube_vid");
            
            if(vid_id != undefined){
                video_obj.innerHTML += `
                    <div class="vid_item">
                        <h4 class="text-center">${titulo}</h4>
                        <div class="centrar_xy">
                            <iframe src="https://www.youtube.com/embed/${vid_id}" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                    </div>
                `;    
            }
        });


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
                    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALwwaAEAAAAAY6dpWkihDdoulSbpKdPKpRhr6Hk%3DUYhRm2A86znLANIrE0ebACWAZECVtKQNQldAP43SMIfASYTpvz',
                },
            };
            let peticion = await fetch(baseTwitterSearchUrl3, defaultFetchOptions)
            let respuesta = await peticion.json();
            
            respuesta = respuesta.data[0]

            console.log(respuesta)
            
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