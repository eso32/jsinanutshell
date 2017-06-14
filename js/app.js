window.addEventListener('scroll', () => {
  const backToTop = document.getElementById('backToTop');
  const logoDiv = document.getElementById('logoDiv');
  const imgLogo = document.getElementById('img');
  const menu = document.getElementById('menu');
  let yPos = window.pageYOffset;
  if(yPos > 90){
    backToTop.style.display = 'block';
    logoDiv.style.height = '100px';
    logoDiv.style.clipPath = 'none';
    logoDiv.style.textAlign = 'left';
    menu.style.display = 'block';
    if(window.innerWidth < 600){
      menu.style.display = 'none'; 
    }
	} else if (yPos < 90){
    backToTop.style.display = 'none';
    logoDiv.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 75%, 60% 75%, 50% 90%, 40% 75%, 0% 75%)';
    logoDiv.style.textAlign = 'center';
    menu.style.display = 'none';
    if(window.innerWidth > 880){
      logoDiv.style.height = '400px';
    } else if (window.innerWidth < 880 && window.innerWidth > 476){
      logoDiv.style.height = '200px';
    } else{
      logoDiv.style.height = '100px';
    }
	}
});

let postsAdded = 4;
function sendAJAX(){
  console.log(menu);
  let body = document.getElementsByTagName('body')[0];
  let section = document.getElementsByTagName('section')[0];
  let inputHTML = '';
	let contentHeight = body.offsetHeight;
	let yOffset = window.pageYOffset;
	let y = yOffset + window.innerHeight;
  let afterAdding = postsAdded + 2;

  if((contentHeight-30) < y){
    $.getJSON('data.json', function(data){
      $.each(data, function(index, value){
        if(index > postsAdded && index < afterAdding){
            inputHTML += '<div class="toHide"><h2>'+value.title+'</h2><ul>';
            $.each(value.content, function(i, content){
              inputHTML +='<li>'+content+'</li>';
            });
            inputHTML +='</ul></div>';
            postsAdded++;
        }
      });
      $(inputHTML).hide().appendTo(section).fadeIn(1500);
    }).fail((jqXHR) => {
      console.log(jqXHR.response);
    });
  }
}

window.addEventListener('scroll', sendAJAX);
