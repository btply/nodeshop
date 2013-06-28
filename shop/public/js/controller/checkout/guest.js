$(document).ready(function(){


// Phone validation method
$.validator.addMethod('phone', function(value) {
    var numbers = value.split(/\d/).length - 1;
    return (10 <= numbers && numbers <= 20 && value.match(/^(\+){0,1}(\d|\s|\(|\)){10,20}$/)); 
    }, 'Please enter a valid phone number');


// Validate form
$('#form').validate({
    
    // Rules for validation
    rules: {
        nameFirst: {
            minlength: 2,
            required: true
        },
        nameLast: {
            minlength:2 ,
            required: true
        },
        email: {
            required: true,
            email: true
            },
        password: {
            minlength: 6,
            required: true
        },
        passwordConf: {
            equalTo: '#password',
            required: true
        },
        contactNum: {
            phone: true
        },
        address1: {
            minlength: 4,
            required: true
        },
        address2: {
            minlength: 4  
        },
        addressTown: {
            required: true,
            minlength: 3
        },
        addressProvince: {
            required: true,
            minlength: 3
        },
        addressPcd: {
            required: true,
            minlength: 4
        },
        addressCountry: {
            required: true
        },
        checkTerms: {
            required: true
        }
    },
    
    // Custom validation messages
    messages: {
        checkTerms: {
            required: 'Please accept our Terms & Conditions.'
        }
    },
    
    // Highlight function
	highlight: function(element) { $(element).closest('.control-group').removeClass('success').addClass('error') },
        
	// Success function
    success: function(element) { element.addClass('valid').closest('.control-group').removeClass('error').addClass('success') }
        
    });
});