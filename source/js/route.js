$('.heading').click(function() {
	content = this.getAttribute("data-content");
	var url = window.location.href; 
	window.location.href = url + "p/"+content
})