$(document).ready(function () {

    var count = 0, bg;
    var $body = $("body");
    var imageArray = ["https://cdn.pixabay.com/photo/2015/01/16/15/00/concert-601537_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/22/19/15/audience-1850119_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/03/29/07/59/musician-1287714_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/03/03/10/34/action-3195378_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/03/26/10/40/people-691777_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/04/13/13/37/dj-720589_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/02/09/00/07/party-629241_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/09/25/22/59/franz-958390_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/10/01/13/28/music-2805506_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/07/05/14/10/gig-3518406_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/06/08/08/30/instruments-801271_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/01/19/18/02/concerts-1150042_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/09/02/18/52/musician-2708190_960_720.jpg",
        "https://cdn.pixabay.com/photo/2013/08/09/17/19/drummer-171120_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/10/06/17/18/rock-2823831_960_720.jpg",
        "https://cdn.pixabay.com/photo/2014/04/05/11/39/concert-316464_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/04/10/16/55/live-music-2219036_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/03/03/17/03/crowd-3196070_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/03/28/20/10/guitarist-2183265_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_960_720.jpg"
    ];

    //  var arr = ['c1.jpg','c2.jpg','c3.jpg','c4.jpg','c5.jpg','c6.jpg' 'c7.jpg'];       

    setInterval(function () {
        if (count == 20)
            count = 0;
        bg = "url('" + imageArray[count] + "')";
        count++;
        $body.css({
            "background-image": bg,
            "background-size": "cover",
            "transition": "2s" 
        });
    }, 6000);

}); //END document.ready