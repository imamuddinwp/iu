jQuery(function($){ 


    $('body, .blog-wrap .col-sm-12, .portfolio-loop').imagesLoaded(function(){

        $('.loader').find('img').delay(100).fadeOut();

        $('.loader').delay(700).fadeOut();


        /* Masonry */   
        $('.blog-wrap .col-sm-12').masonry({

            columnWidth: '.col-sm-4',
            gutterWidth: 30,

        });

        $('.portfolio-loop').masonry({

            columnWidth: '.col-sm-3',
            gutterWidth: 30,

        });

    });


    $('.h-resume').masonry({

        columnWidth:'.col-sm-6',
        gutterWidth:30

    });

    
    

    /* Menu */
    $('.mobile-touch .fa').click(function(){

        $('.nav').stop().slideToggle(200);

        $(this).toggleClass('active-icon');

    });

    /* Tooltip */
    if($(window).width() > 769){

        $('.homepage').find('a').tooltip();

    }


       


    /* Progress Bar Animate */
    $('.progress-bar').each(function(){     

        var prog=$(this).attr('aria-valuenow');

        $(this).width(prog+'%');

    });
    

    

    

   
   


    $('form').find('input[type="text"],input[type="email"],textarea').addClass('form-control');


    $('input[type="submit"]').addClass('btn btn-default');


    $("article").fitVids();


/************************************************************************
// Google Map
*************************************************************************/


function render_map( $el ) {
 
    // var
    var $markers = $el.find('.marker');
 
    // vars
    var args = {
        zoom        : 16,
        center      : new google.maps.LatLng(0, 0),
        mapTypeId   : google.maps.MapTypeId.ROADMAP,
        panControl:false,
        scrollwheel:false,
        streetViewControl:false
    };
 
    // create map               
    var map = new google.maps.Map( $el[0], args);
 
    // add a markers reference
    map.markers = [];
 
    // add markers
    $markers.each(function(){
 
        add_marker( $(this), map );
 
    });
 
    // center map
    center_map( map );
 
}

function add_marker( $marker, map ) {
 
    // var
    var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
 
    // create marker
    var marker = new google.maps.Marker({
        position    : latlng,
        map         : map
    });
 
    // add to array
    map.markers.push( marker );
 
    // if marker contains HTML, add it to an infoWindow
    if( $marker.html() )
    {
        // create info window
        var infowindow = new google.maps.InfoWindow({
            content     : $marker.html()
        });
 
        // show info window when marker is clicked
        google.maps.event.addListener(marker, 'click', function() {
 
            infowindow.open( map, marker );
 
        });
    }
 
}

function center_map( map ) {
 
    // vars
    var bounds = new google.maps.LatLngBounds();
 
    // loop through all markers and create bounds
    $.each( map.markers, function( i, marker ){
 
        var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
 
        bounds.extend( latlng );
 
    });
 
    // only 1 marker?
    if( map.markers.length == 1 )
    {
        // set center of map
        map.setCenter( bounds.getCenter() );
        map.setZoom( 12 );
    }
    else
    {
        // fit to bounds
        map.fitBounds( bounds );
    }
 
}
 

 
 jQuery(function($){


    $('.acf-map').each(function(){
 
        render_map( $(this) );
 
    });

})
 
});