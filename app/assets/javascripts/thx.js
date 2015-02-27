$('.url').attr("autocomplete", "off");
var selected = false
$('.saved .source,.saved .destination').on("focus", function(e){
	row = this.parentElement.parentElement
	$(row).addClass('hoveredon')
	selected = true
})

$('.saved .source,.saved .destination').on("focusout", function(e){
	row = this.parentElement.parentElement
	$(row).removeClass('hoveredon')
	selected = false
})
$('.saved').on("mouseover", function(e){
	if (selected == false){
	$(this).addClass('hoveredon')
	}
})
$('.saved').on("mouseout", function(e){
	if (selected == false){
	$(this).removeClass('hoveredon')
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
	idtokill = this.parentElement.getAttribute('data-id')
	$.ajax({	
		url: '/links/kill/'+idtokill,
		type: 'POST',
	})
	rowtokill = this.parentElement.parentElement
	$(rowtokill).transition({
		scale: .1, opacity: 0, duration: 300
	}, function(){
	  rowtokill.remove()
  });
  selected = false
})


//GO BUTTON 
$(".arrow").on("click", function(e){
	e.preventDefault()
	local = this.parentElement.children[0].children[0].value
	url = "http://<%= session[:user_name] %>.thx.bz/"+local
	console.log('requested: '+url)
	window.open(url, '_blank')
})


//EDIT FORM FORM KEYPRESSES
$('.saved .source').keypress(function(e) {
	regex = new RegExp("^[a-zA-Z0-9]+$")
	key = e.keyCode
	key2 = String.fromCharCode(e.keyCode)
	//only allows alphanumeric input
	if ((regex.test(key2) == false)||(key ==32)){
		e.preventDefault()
	}
	//enter on local edit form 
  if (e.keyCode == 13){
	  pulseLogo();	
	 	local = this
	 	external = this.parentElement.parentElement.children[1].children[0]
	 	id = this.parentElement.parentElement.getAttribute('data-id')
	 	external.value = checkforhttp(external.value)
	 	saveEdit(id,local.value,external.value)
	 	row = this.parentElement.parentElement.children[4]
	 	pulseSaved(row)
  }
});
$('.saved .destination').keydown(function(e) {
  if (e.keyCode == 13){ //enter key
  	pulseLogo();
	 	external = this
	 	local = this.parentElement.parentElement.children[0].children[0]
	 	id = this.parentElement.parentElement.getAttribute('data-id')
	 	external.value = checkforhttp(external.value)
	 	saveEdit(id,local.value,external.value)
	 	row = this.parentElement.parentElement.children[4]
	 	pulseSaved(row)
  }
  // if (e.keyCode == 9){ //tab key
  // 	e.preventDefault()
  // 	this.parentElement.parentElement.children[0].children[0].focus()
  // }
});


//ADD FORM KEYPRESSES
$('.main-input .destination').keydown(function(e) {
  if (e.keyCode == 13){ //enter key
		pulseLogo();
		e.preventDefault()
		newlocal = this.parentElement.parentElement.children[1].children[0]
		newexternal = this.parentElement.parentElement.children[2].children[0]
		if ((newlocal.value != "")&&(newexternal.value != "")){
			newexternal.value = checkforhttp(newexternal.value)
			$('#makenew').submit()	
		}	
  }
  // if (e.keyCode == 9){ //tab key
  // 	e.preventDefault()
  // 	this.parentElement.parentElement.children[1].children[0].focus()
  // }
})
$('.main-input .source').keypress(function(e) {
	regex = new RegExp("^[a-zA-Z0-9]+$")
	key = e.keyCode
	key2 = String.fromCharCode(e.keyCode)
	//only allows alphanumeric input
	if ((regex.test(key2) == false)||(key ==32)){  
		e.preventDefault()
	}
  if (e.keyCode == 13){ //enter key
		pulseLogo();
		e.preventDefault()
		newlocal = this.parentElement.parentElement.children[1].children[0]
		newexternal = this.parentElement.parentElement.children[2].children[0]
		if ((newlocal.value != "")&&(newexternal.value != "")){
			newexternal.value = checkforhttp(newexternal.value)
			$('#makenew').submit()	
		}	
  }
})


//UP AND DOWN ARROWS TO MOVE THROUGH INPUTS
$('.saved input').keydown(function(e) {
  if (e.keyCode == 40){ //down
		next = $(":input").filter(":gt("+$(':input').index(this)+")").not(".auth").first().focus()
  }
  if (e.keyCode == 38){ //up
		$(":input").filter(":lt("+$(':input').index(this)+")").not(".auth").last().focus()
  }
})


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