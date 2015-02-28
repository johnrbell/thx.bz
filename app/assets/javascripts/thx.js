$('.url').attr("autocomplete", "off");
var selected = false




$('.front .menu').on("click", function(e){
	$('.card').removeClass('flipped')
	$('.saved').removeClass('hoveredon')
	$(this).parent().addClass('hoveredon')
	$(this).parent().parent().parent().toggleClass('flipped')
	selected = true
})

$( ".front" ).dblclick(function() {
	$('.card').removeClass('flipped')
	$('.saved').removeClass('hoveredon')
	$(this).parent().toggleClass('flipped')
	selected = true
});

$('.back .menu').on("click",function(e){
	$('.card').removeClass('flipped')
	selected = false
})




//WHEN YOU SELECT AN EDIT BOX ON THE BACK
$('.back .source,.back .destination').on("focus", function(e){
	$(this).css({'font-style':'italic'})
	// fontsize = fontresize(7,$(this).css("font-size") )
	// $(this).css({'font-size':fontsize})
	selected = true
})
$('.card,.back .source,.back .destination').on("focusout", function(e){
	$(this).css({'font-style':'normal'})
	// fontsize = fontresize(-7,$(this).css("font-size") )
	// $(this).css({'font-size':fontsize})
})

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

//ADD BUTTON 
$(".add").on("click", function(e){
	pulseLogo();
	newlocal = this.parentElement.parentElement.children[1].children[0]
	newexternal = this.parentElement.parentElement.children[2].children[0]
	if ((newlocal.value != "")&&(newexternal.value != "")){
	newexternal.value = checkforhttp(newexternal.value)
	$('#makenew').submit()	
	}	
})

//DELETE BUTTON
$(".del").on("click", function(e){
	e.preventDefault();
	idtokill = this.parentElement.getAttribute('data-id')
	$.ajax({	
		url: '/links/kill/'+idtokill,
		type: 'POST',
	})
	rowtokill = $(this).parent().parent().parent().parent().parent()
	$(rowtokill).transition({
		scale: .1, opacity: 0, duration: 300
	}, function(){
	  rowtokill.remove()
  });
  selected = false
})

//GO BUTTON 
$(".arrow").on("click", function(e){
	if (selected == false){
		url = $(this).attr('data-loc') 
		console.log('requested: '+url)
		window.open(url, '_blank')
	}
})


// ================================================================
// 	KEY PRESSES
// ================================================================

//only allows alphanumeric input for LOCAL
$('.source').keypress(function(e) {
	regex = new RegExp("^[a-zA-Z0-9]+$")
	key = e.keyCode
	key2 = String.fromCharCode(e.keyCode)
	if ((regex.test(key2) == false)||(key ==32)){
		e.preventDefault()
	}
});

//ADD NEW
$('.main-input input').keydown(function(e) {
	if (e.keyCode == 13){ //enter key
		e.preventDefault()
		pulseLogo();
		newlocal = this.parentElement.parentElement.children[1].children[0]
		newexternal = this.parentElement.parentElement.children[2].children[0]
		if ((newlocal.value != "")&&(newexternal.value != "")){
			newexternal.value = checkforhttp(newexternal.value)
			$('#makenew').submit()	
		}	
  }
})

//EDIT 
$('.saved input').keydown(function(e) {
  if (e.keyCode == 13){ //enter key
	  console.log('saved edit')
  	pulseLogo();

  	saved = $(this).parent().parent()
  	local = $(saved.children()[1].children)[0]
  	external = $(saved.children()[2].children)[0]
	 	id = this.parentElement.parentElement.getAttribute('data-id')
	 	external.value = checkforhttp(external.value)

	 	saveEdit(id,local.value,external.value)
	 	row = $(this).parent().parent().children().last()

		frontside = $(this).parent().parent().parent().parent().parent().children()[0]
	 	$(frontside).children().children()[0].children[0].children[0].innerText = local.value
		$(frontside).children().children()[1].children[0].innerText = external.value
		$('.card').removeClass('flipped')
		$('.saved').removeClass('hoveredon')
		selected = false
	 	pulseSaved(row)
  }
});

//UP AND DOWN ARROWS TO MOVE THROUGH INPUTS
// $('.saved input').keydown(function(e) {
//   if (e.keyCode == 40){ //down
// 		next = $(":input").filter(":gt("+$(':input').index(this)+")").not(".auth").first().focus()
//   }
//   if (e.keyCode == 38){ //up
// 		$(":input").filter(":lt("+$(':input').index(this)+")").not(".auth").last().focus()
//   }
// })

// ================================================================
// 	FUNCTIONS
// ================================================================

function pulseSaved(saved){
 	$(saved).css('display','block')
		setTimeout(function(){ 
		$(saved).transition({
			scale: .1, opacity: 0, duration: 300
		}, function(){
		  $(saved).transition({
			scale: 1, opacity: 1, duration: 300,display: "none"
			})
	  })
 	}, 500);
}
 
function saveEdit(id,local,external){
	data = {local: local, external: external}
		$.ajax({	
		url: '/links/edit/'+id,
		type: 'POST',
		data: data
	})
}

function checkforhttp(string){
	regex = new RegExp("^(http|https):\/\/")
	if (regex.test(string)==false){
		string = "http://"+string 
	}
	return string;
}

function pulseLogo() {
	$('.pulse').transition({
		scale: 6, opacity: 0, duration: 800
	}, function(){
      $(this).css({'transform':'', 'opacity':'1'});
  });
}

function fontresize(value,fontsize) {
	fontsize = fontsize.replace('px','')
	fontsize = parseInt(fontsize)
	fontsize = fontsize + value
	fontsize = fontsize+"px"
	return fontsize
}