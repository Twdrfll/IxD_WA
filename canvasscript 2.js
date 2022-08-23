const schermata_alert = document.getElementById("main-alert");
const schermata_principale = document.getElementById("page-div");
const indietro = document.getElementById("indietro"); // tasto indietro
const avanti = document.getElementById("avanti"); // tasto avanti
const fullscreen = document.getElementById("fullscreen"); // tasto avanti
const start_experience = document.getElementById("start-experience"); // tasto iniziale
const condividi = document.getElementById("condividi"); // tasto condividi
var bridge = document.getElementById("bridge"),
    bridgeCanvas = bridge.getContext('2d'),
    brushRadius = (bridge.width / 100) * 5,
    img = new Image();

// setup prima canvas iniziale

current_picture = 1;

if (brushRadius < 50) { brushRadius = 50 }

img.onload = function(){  
	bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
    bridgeCanvas.save();
}
img.loc = 'immagini/';
img.filename = '1\ \(1\).png';
img.src = img.loc + img.filename;

// setup impostazioni di disegno sul canvas

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

// funzioni di cambio immagine di background e interattiva su canvas

function bgImageSwitcherNext() {
    let basic_string = "immagini/"
    if (current_picture < 10) {
        current_picture++;
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bgimgobj = new Image();
            bgimgobj.onload = function() {
                bridge.style['background-image'] = "url('" + bgimgobj.src + "')";
                bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
                bridgeCanvas.save();
            }
            bgimgobj.loc = basic_string;
            bgimgobj.src = basic_string.concat(new_url_bg);
        }
        img.src = basic_string.concat(new_url_top);
    } else {
        current_picture = 1
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bgimgobj = new Image();
            bgimgobj.onload = function() {
                bridge.style['background-image'] = "url('" + bgimgobj.src + "')";
                bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
                bridgeCanvas.save();
            }
            bgimgobj.loc = basic_string;
            bgimgobj.src = basic_string.concat(new_url_bg);
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
            bgimgobj.onload = function() {
                bridge.style['background-image'] = "url('" + bgimgobj.src + "')";
                bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
                bridgeCanvas.save();
            }
            bgimgobj.loc = basic_string;
            bgimgobj.src = basic_string.concat(new_url_bg);
        }
        img.src = basic_string.concat(new_url_top);
    } else {
        current_picture = 10
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function() {
            bridgeCanvas.restore();
            bgimgobj.onload = function() {
                bridge.style['background-image'] = "url('" + bgimgobj.src + "')";
                bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
                bridgeCanvas.save();
            }
            bgimgobj.loc = basic_string;
            bgimgobj.src = basic_string.concat(new_url_bg);
        }
        img.src = basic_string.concat(new_url_top);
    }
}

// setup listener di eventi su canvas

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

// altre funzioni

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

// altri listener

avanti.addEventListener("click", bgImageSwitcherNext);

indietro.addEventListener("click", bgImageSwitcherPrevious);