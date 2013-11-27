$(document).ready(function(){

// Validate form
$('#form').validate({
    
    // Highlight function
	highlight: function(element) { $(element).closest('.form-group').removeClass('has-success').addClass('has-error') },
        
	// Success function
    success: function(element) { $(element).addClass('valid').closest('.form-group').removeClass('error').addClass('has-success') }
        
});

// Delete function
$('#delete').click(function(){
    
    // Get product id from DOM
    var id = $(this).attr("product");
    
    // Confirm dialog
    if (confirm('Delete product "' + id + '?')===true) {
        
        // If new product no need for database
        if (id=='new') {
            
            // Redirect to product home
            window.location = '/products';
            
        } else {
            
            // Post to the remove url
            $.post('/products/'+id+'/remove',function(){
                
                window.location = '/products';
            });
        }
    }
});

});