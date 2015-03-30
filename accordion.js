jQuery(document).ready(function() {
	jQuery('.accordion-button-open').click(function(e) {
		jQuery('.accordion .accordion-section-title').addClass('active');
		jQuery('.accordion .accordion-section-content').slideDown(300).addClass('open');
	});

	jQuery('.accordion-button-close').click(function(e) {
		
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	});

	jQuery('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).attr('href');

		if(jQuery(e.target).is('.active')) {
			// Remove active class from section title
			jQuery(this).removeClass('active');
			// Close the content panel
			jQuery('.accordion ' + currentAttrValue).slideUp(300).removeClass('open');

		}else {
			// Add active class to section title
			jQuery(this).addClass('active');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
	});
});