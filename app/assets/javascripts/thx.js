$('.url').attr("autocomplete", "off");
var selected = false


// =============================================================================
// 	MOUSE CLICKS ON SPECIFIC BUTTONS
// =============================================================================

//WHEN YOU CLICK ONE OF THE NEW URL BOXES, UNFLIPS AN EDIT BOX BELOW
$('.main-input .url').on("click", function(e){
	$('.card').removeClass('flipped')
	$('.saved').removeClass('hoveredon')
	selected = false
})

//ADD BUTTON ON NEW, TRIES TO CREATE NEW 
$(".main-input .add").on("click", function(e){
		create_link();
})

//WHEN YOU CLICK ON THE FRONT ... BUTTON, FLIP TO EDIT
$('.front .menu').on("click", function(e){
	$('.card').removeClass('flipped')
	$('.saved').removeClass('hoveredon')
	$(this).parent().addClass('hoveredon')
	$(this).parents('.card').toggleClass('flipped')
	selected = true
})

//WHEN YOU CLICK ON THE REAR ... BUTTON, FLIP BACK TO FRONT
$('.back .menu').on("click",function(e){
	$('.card').removeClass('flipped')
	selected = false
})

//GO BUTTON ON SAVED ROW, OPENS NEW WINDOW USING THX.BZ ROUTE
$(".front .arrow").on("click", function(e){
	if (selected == false){
		url = $(this).attr('data-loc')
		domain = document.location.host.gsub('www.','') 
		url = url.replace('!!HOST!!',domain)

		console.log('requested: '+url)
		window.open(url, '_blank')
	}
})

//DELETE BUTTON ON SAVED ROW, DELETES RECORD, REMOVES ROW FROM DOM
$(".back .del").on("click", function(e){
	//deletes the record from db.
	e.preventDefault();
	idtokill = this.parentElement.getAttribute('data-id')
	$.ajax({	
		url: '/links/kill/'+idtokill,
		type: 'POST',
	})
	//deletes the row from the dom.
	rowtokill = $(this).parents('.flip')
	$(rowtokill).transition({
		scale: .1, opacity: 0, duration: 300
	}, function(){
	  rowtokill.remove()
  });
  selected = false
})

//WHEN YOU DOUBLE CLICK A ROW OF SAVED - FLIP TO EDIT SIDE
$( ".front" ).dblclick(function() {
	$('.card').removeClass('flipped')
	$('.saved').removeClass('hoveredon')
	$(this).parent().toggleClass('flipped')
	selected = true
});

//WHEN YOU SELECT AN EDIT BOX ON THE BACK, MAKE ITALIC
$('.back .source,.back .destination').on("focus", function(e){
	$(this).css({'font-style':'italic'})
	// fontsize = fontresize(7,$(this).css("font-size") )
	// $(this).css({'font-size':fontsize})
	selected = true
})
//WHEN YOU UNSELECT AN EDIT BOX ON THE BACK, MAKE NORMAL
$('.back .source,.back .destination').on("focusout", function(e){
	$(this).css({'font-style':'normal'})
	// fontsize = fontresize(-7,$(this).css("font-size") )
	// $(this).css({'font-size':fontsize})
})



// =============================================================================
// 	MOUSE HOVERS
// =============================================================================

//HOVER ON ROWS IF NOTHING IS FLIPPED CURRENTLY 
$('.front').on("mouseover", function(e){
	if (selected == false){
		$(this).children().addClass('hoveredon')
	}
})
$('.front').on("mouseout", function(e){
	if (selected == false){
		$(this).children().removeClass('hoveredon')
	}
})



// =============================================================================
// 	KEY PRESSES
// =============================================================================

//ONLY ALLOWS ALPHANUMERIC INPUT FOR LOCAL/SOURCE
$('.source').keypress(function(e) {
	regex = new RegExp("^[a-zA-Z0-9]+$")
	key = e.keyCode
	key2 = String.fromCharCode(e.keyCode)
	if ((regex.test(key2) == false)||(key ==32)){
		e.preventDefault()
	}
});

//FOR EITHER NEW INPUT, ON ENTER KEY- SUBMIT FOR ADDING NEW ROUTE
$('.main-input input').keydown(function(e) {
	if (e.keyCode == 13){ //enter key
		e.preventDefault()
		create_link();
	}	
})

//IN EDIT INPUTS, ON ENTER KEY- SUBMIT THE EDIT, UPDATE FRONT, SHOW SAVED MSG, FLIP BACK.
$('.saved input').keydown(function(e) {
  if (e.keyCode == 13){ //enter key
  	pulseLogo();
  	//gets all the data needed to save
  	saved = $(this).parents('.saved')
		id = saved.attr('data-id')
		local	= $(this).parents('.saved').find('.source')
  	external = $(this).parents('.saved').find('.destination')
	 	external.val(checkforhttp(external.val()))
		saveEdit(id,$(local).val(),$(external).val())
		//updates the front to match the edits 
	 	$(this).parents('.card').find('.p2url').text($(local).val())
	 	$(this).parents('.card').find('.p3url').text($(external).val())
	 	row = $(this).parents('.flip').find('.savedmsg')
	 	pulseSaved(row)
	 	//delay before flipping back, to show updated msg
	 	setTimeout(function(){
	 	selected = false
	 	$('.card').removeClass('flipped')
		$('.saved').removeClass('hoveredon')	
	 	},800)
  }
});



// =============================================================================
// 	FUNCTIONS
// =============================================================================

//FLASHES THE SAVED/UPDATED MESSAGE ON A ROW
function pulseSaved(row){
 	$(row).css('display','block')
		setTimeout(function(){ 
		$(row).transition({
			scale: .1, opacity: 0, duration: 400
		}, function(){
		  $(row).transition({
			scale: 1, opacity: 1, duration: 400,display: "none"
			})
	  })
 	}, 800);
}
 
//MAKES AJAX CALL TO SAVE EDIT
function saveEdit(id,local,external){
	data = {local: local, external: external}
		$.ajax({	
		url: '/links/edit/'+id,
		type: 'POST',
		data: data
	})
}

//TAKES A STRING, LOOKS FOR HTTP OR HTTPS, IF NOT, ADDS IT, RETURNS
function checkforhttp(string){
	regex = new RegExp("^(http|https):\/\/")
	if (regex.test(string)==false){
		string = "http://"+string 
	}
	return string;
}

//PULSE ANIMATION FOR THE BLUE RING
function pulseLogo(){
	$('.pulse').transition({
		scale: 6, opacity: 0, duration: 800
	}, function(){
    $(this).css({'transform':'', 'opacity':'1'});
  });
}

//ENTER A FONT, GET A DIFFERENT SIZE BACK
function fontresize(value,fontsize) {
	fontsize = fontsize.replace('px','')
	fontsize = parseInt(fontsize)
	fontsize = fontsize + value
	fontsize = fontsize+"px"
	return fontsize
}

//WHEN A NEW LINK IS SUBMITTED
function create_link(){
	newlocal = $('body').find('.main-input .source')
	newexternal = $('body').find('.main-input .destination')
	if ((newlocal.val() != "")&&(newexternal.val() != "")){
		newexternal.val(checkforhttp(newexternal.val()))
		$('#makenew').submit()	
	}	
}

//FLASH RING WHEN ALL IMAGES LOAD AFTER A REFRESH
$('body').imagesLoaded( function() {
  pulseLogo();
});