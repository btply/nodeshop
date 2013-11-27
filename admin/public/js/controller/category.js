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
    
    // Get category id from DOM
    var id = $(this).attr("category");
    
    // Confirm dialog
    if (confirm('Delete category "' + id + '?')===true) {
        
        // If new product no need for database
        if (id=='new') {
            
            // Redirect to category home
            window.location = '/categories';
            
        } else {
            
            // Post to the remove url
            $.post('/categories/'+id+'/remove',function(){
                
                window.location = '/categories';
            });
        }
    }
});

});