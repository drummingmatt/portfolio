console.log('Hello World!');

const form = document.getElementById("contactForm");
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
	event.preventDefault();
	const data = new FormData(event.target);
    const name = data.get("name");
	const email = data.get("email");
    const message = data.get("message");
	console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    var request = new XMLHttpRequest();
    request.open("GET", "https://www.mattfinney.com/send.php");
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
          // Check the status of the response
          if (request.status == 200) {
            // Access the data returned by the server
            var data = request.responseText;
            console.log('success');
          } else {
            console.log('error');
          }
        }
      };
}

function handleJumpLinks() {
    //document.querySelector["#contactForm"].addEventListener("submit",postData);
    document.querySelectorAll('a[href^="#"]').forEach( ( a ) => {
        a.addEventListener( 'click', function ( event ) {
            event.preventDefault();
            this.blur();
            const target = document.querySelector( this.getAttribute('href') );
            if ( target ) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const topOfMyDestination = target.offsetTop - 60;
                window.scroll({ top: topOfMyDestination, behavior: "smooth" });
            }
        } );
    } );
}

if ( document.readyState === 'loading' ) {
    // Loading hasn't finished yet, set an event listener
    document.addEventListener( 'DOMContentLoaded', handleJumpLinks );
} else {
    // `DOMContentLoaded` has already fired, run the func directly
    handleJumpLinks();
}

//overlay toggle
const overlay = document.querySelector('.overlay');
const overlayTitle = document.querySelector('.overlay h4');
const overlayDescription = document.querySelector('.overlay p');
const mask = document.querySelector('.mask');
const closeBtn = document.querySelector('.overlay .close');
const menuBtn = document.querySelector('.menu-button');
const navItems = document.querySelector('.nav-items');

document.querySelectorAll('.logo-card').forEach( ( card ) => {
    card.addEventListener( 'click', function ( event ) {
        let client = this.getAttribute('data-client');
        let clientName = this.getAttribute('data-title');
        let clientDescription = this.getAttribute('data-content');

       //console.log(this.getAttribute('data-client'));

        overlayTitle.innerHTML = clientName;
        overlayDescription.innerHTML = clientDescription;

        mask.classList.add('active');
        overlay.classList.add('active');
    });
});

closeBtn.addEventListener( 'click', function ( event ) {
    mask.classList.remove('active');
    overlay.classList.remove('active');
});

menuBtn.addEventListener( 'click', function ( event ) {
    if(menuBtn.classList.contains('is-active')) {
        menuBtn.classList.remove('is-active');
        navItems.classList.add('hide-mobile');
    } else {
        menuBtn.classList.add('is-active');
        navItems.classList.remove('hide-mobile');
    }
});

mask.addEventListener( 'click', function ( event ) {
    mask.classList.remove('active');
    overlay.classList.remove('active');
});

document.addEventListener( 'keyup', function ( e ) {
    if(e.key === "Escape") {
        mask.classList.remove('active');
        overlay.classList.remove('active');
    }
});

const rrPlay = document.querySelector('.rrPlay');

function isVisible (ele) {
    const { top, bottom } = ele.getBoundingClientRect();
    const vHeight = (window.innerHeight || document.documentElement.clientHeight);
  
    return (
      (top > 0 || bottom > 0) &&
      top < vHeight
    );
  }

  document.addEventListener('scroll', function () {
        if(isVisible(rrPlay)) {
            document.getElementById("rickroll").play();
        } else {
            if(!document.getElementById("rickroll").paused) {
                document.getElementById("rickroll").pause();
            }
        }
});

function postData(formsubmission){


	var firstName = encodeURIComponent(document.getElementById("name").value);
	var email = encodeURIComponent(document.getElementById("email").value);
	var message = encodeURIComponent(document.getElementById("message").value);

	// Checks if fields are filled-in or not, returns response "<p>Please enter your details.</p>" if not.
	if(firstName == "" || email == ""){
		document.getElementById("status").innerHTML = "<p>Please enter your details.</p>";
		return;
	}

	// Parameters to send to PHP script. The bits in the "quotes" are the POST indexes to be sent to the PHP script.
	var params = "name=" + firstName + "&email=" + email + "&message=" + message;

	var http = new XMLHttpRequest();
	http.open("POST","send.php",true);

	// Set headers
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function(){
		if(http.readyState == 4 && http.status == 200){
			document.getElementById("response").innerHTML = http.responseText;
		}
	}
	http.send(params);
    formsubmission.preventDefault();
}
  

   /* function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    
        );
    }
    
    
    const play = document.querySelector('.rrPlay');
    
    document.addEventListener('scroll', function () {
        const messageText = isInViewport(play) ?
            'The box is visible in the viewport' :
            'The box is not visible in the viewport';
    
            document.getElementById("rickroll").play();
    
    }, {
        passive: true
    });   

const range = document.querySelector('.range');
const flame = document.querySelector('.flame');
const glow = document.querySelector('.glow');

range.addEventListener('input', (event) => {
  flame.style.setProperty(
    'transform',
    `scale(${event.target.value})
    translate(-13px, -15px)`,
  );
  
  glow.style.setProperty(
    'opacity',
    event.target.value * 0.1,
  );
});*/

