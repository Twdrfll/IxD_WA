const schermata_alert = document.getElementById("alert-rotazione-device");
const schermata_iniziale = document.getElementById("schermata-iniziale");
const schermata_principale = document.getElementById("schermata-principale");
const indietro = document.getElementById("indietro"); // tasto indietro
const avanti = document.getElementById("avanti"); // tasto avanti
const fullscreen = document.getElementById("fullscreen"); // tasto avanti
const start_experience = document.getElementById("start-experience"); // tasto iniziale
const condividi = document.getElementById("condividi"); // tasto condividi
var bridge = document.getElementById("bridge"),
    bridgeCanvas = bridge.getContext('2d'),
    brushRadius = (bridge.width / 100) * 5,
    img = new Image();

aspect_ratio_target = 1280 / 720;
current_aspect_ratio = window.innerWidth / window.innerHeight;

if (current_aspect_ratio < aspect_ratio_target) {
    schermata_alert.removeAttribute('hidden');
    schermata_principale.setAttribute('hidden', 'hidden')
} else {
    schermata_alert.setAttribute('hidden', 'hidden');
    if (schermata_iniziale.hasAttribute('hidden')) {
        schermata_principale.removeAttribute('hidden');
    }
}

current_picture = 1;

if (brushRadius < 50) { brushRadius = 50 }

img.onload = function(){  
	bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
    bridgeCanvas.save();
}
img.loc = 'immagini/';
img.filename = '1\ \(1\).png';
img.src = img.loc + img.filename;

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
	var bridgeRect = bridge.getBoundingClientRect();
    return {
	  x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*bridge.width),
	  y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*bridge.height)
    };
}
      
function drawDot(mouseX,mouseY){
	bridgeCanvas.beginPath();
    bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    bridgeCanvas.fillStyle = '#000';
    bridgeCanvas.globalCompositeOperation = "destination-out";
    bridgeCanvas.fill();
}

function bgImageSwitcherNext() {
    let basic_string = "immagini/"
    if (current_picture < 10) {
        current_picture++;
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
            bridgeCanvas.save();
            bridge.style['background-image'] = 'url(\"' + basic_string + '/' + new_url_bg + '\")';
        }
        img.src = basic_string.concat(new_url_top);
    } else {
        current_picture = 1
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
            bridgeCanvas.save();
            bridge.style['background-image'] = 'url(\"' + basic_string + '/' + new_url_bg + '\")';
        }
        img.src = basic_string.concat(new_url_top);
    }
}

function bgImageSwitcherPrevious() {
    let basic_string = "immagini/"
    if (current_picture > 1) {
        current_picture--;
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
            bridgeCanvas.save();
            bridge.style['background-image'] = 'url(\"' + basic_string + '/' + new_url_bg + '\")';
        }
        img.src = basic_string.concat(new_url_top);
    } else {
        current_picture = 10
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
            bridgeCanvas.save();
            bridge.style['background-image'] = 'url(\"' + basic_string + '/' + new_url_bg + '\")';
        }
        img.src = basic_string.concat(new_url_top);
    }
}

bridge.addEventListener("mousemove", function(e) {
	var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
		drawDot(brushPos.x, brushPos.y);
    }
}, false);

bridge.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
    var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

function alertTriggerer() {
    aspect_ratio_target = 1;
    current_aspect_ratio = window.innerWidth / window.innerHeight;
        if (current_aspect_ratio < aspect_ratio_target) {
            schermata_alert.removeAttribute('hidden');
            schermata_principale.setAttribute('hidden', 'hidden')
        } else {
            schermata_alert.setAttribute('hidden', 'hidden');
            if (schermata_iniziale.hasAttribute('hidden')) {
                schermata_principale.removeAttribute('hidden');
            }
        }
}

function startExperience() {
    schermata_iniziale.hidden = 'true';
    schermata_principale.removeAttribute('hidden');
}

function getFullscreenElement() {
    return document.fullscreenElement   //standard property
        || document.webkitFullscreenElement //safari/opera support
        || document.mozFullscreenElement    //firefox support
        || document.msFullscreenElement;    //ie/edge support
}

function toggleFullscreen() {
    if(getFullscreenElement()) {
        document.exitFullscreen();
    }else {
        document.documentElement.requestFullscreen().catch(console.log);
    }
}

start_experience.addEventListener("click", startExperience);

avanti.addEventListener("click", bgImageSwitcherNext);

indietro.addEventListener("click", bgImageSwitcherPrevious);

fullscreen.addEventListener("click", () => {
    toggleFullscreen();
});

window.onresize = alertTriggerer;
