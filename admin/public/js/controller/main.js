$(document).ready(function() {
    
    $("[data-toggle='modal']").click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        
        $('#modal').load(url,function(){
            $('#modal').modal('show');
        });
    });
    
    $(document).on('click', "a", function(e) {
        
        var addId = $(this).attr('addId');
        if (addId) {$.post('/cart/add/' + addId, function(data) {
            $('#cart').html(data);
        });}
     
    });
    
    $(document).on('click', "i", function(e) {
        var remId = $(this).attr('remId');
        if (remId) {$.post('/cart/rem/' + remId, function(data) {
            $('#cart').html(data);
        });}
        e.preventDefault();
        e.stopPropagation();
    });
    
});

