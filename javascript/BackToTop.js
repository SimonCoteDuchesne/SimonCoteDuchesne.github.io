$('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');

var amountScrolled = 150;

$(window).scroll(function() 
{
	if ( $(window).scrollTop() > amountScrolled ) 
	{
		$('a.back-to-top').fadeIn('slow');
	} 
	else 
	{
		$('a.back-to-top').fadeOut('slow');
	}
});

$('a.back-to-top').click(function() 
{
	$('html, body').animate({scrollTop: 0}, 700);
	return false;
});