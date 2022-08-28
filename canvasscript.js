const schermata_principale = document.getElementById("page-div");
const indietro = document.getElementById("indietro"); // tasto indietro
const avanti = document.getElementById("avanti"); // tasto avanti
const audio_button = document.getElementById("settings"); // tasto avanti
const start_experience = document.getElementById("start-experience"); // tasto iniziale
const condividi = document.getElementById("condividi"); // tasto condividi
const loading_screen = document.getElementById("loading-screen"); // box di caricamento;
var bridge = document.getElementById("bridge"),
    bridgeCanvas = bridge.getContext('2d'),
    brushRadius = (bridge.width / 100) * 5,
    img = new Image();
var audio = new Audio('sound.mp3');
audio.loop = true;
const image_data = [["Immagine 1", "anno 1"],
["Immagine 2", "anno 2"],
["Immagine 3", "anno 3"],
["Immagine 4", "anno 4"],
["Immagine 5", "anno 5"],
["Immagine 6", "anno 6"],
["Immagine 7", "anno 7"],
["Immagine 8", "anno 8"],
["Immagine 9", "anno 9"],
["Immagine 10", "anno 10"]];
const gradientbg_colors = ['rgba(59, 173, 227, 1) 0%, rgba(87, 111, 230, 1) 25%, rgba(152, 68, 183, 1) 51%, rgba(255, 53, 127, 1) 100%',
    'rgba(212, 224, 155, 1) 0%, rgba(246, 244, 210, 1) 25%, rgba(203, 223, 189, 1) 51%, rgba(241, 156, 121, 1) 100%',
    'rgba(255, 166, 158, 1) 0%, rgba(250, 243, 221, 1) 25%, rgba(184, 242, 230, 1) 51%, rgba(174, 217, 224, 1) 100%',
    'rgba(0, 48, 73, 1) 0%, rgba(214, 40, 40, 1) 25%, rgba(247, 127, 0, 1) 51%, rgba(252, 191, 73, 1) 100%',
    'rgba(33, 158, 188, 1) 0%, rgba(2, 48, 71, 1) 25%, rgba(255, 183, 3, 1) 51%, rgba(251, 133, 0, 1) 100%',
    'rgba(38, 84, 124, 1) 0%, rgba(239, 71, 111, 1) 25%, rgba(255, 209, 102, 1) 51%, rgba(6, 214, 160, 1) 100%',
    'rgba(43, 45, 66, 1) 0%, rgba(141, 153, 174, 1) 25%, rgba(237, 242, 244, 1) 51%, rgba(239, 35, 60, 1) 100%',
    'rgba(60, 21, 24, 1) 0%, rgba(105, 20, 14, 1) 25%, rgba(164, 66, 0, 1) 51%, rgba(213, 137, 54, 1) 100%',
    'rgba(239, 71, 111, 1) 0%, rgba(255, 209, 102, 1) 25%, rgba(6, 214, 160, 1) 51%, rgba(17, 138, 178, 1) 100%',
    'rgba(241, 250, 238, 1) 0%, rgba(168, 218, 220, 1) 25%, rgba(69, 123, 157, 1) 51%, rgba(29, 53, 87, 1) 100%',
];

// setup prima canvas iniziale

if (window.matchMedia("only screen and (min-width: 1000px)").matches) {
    if ((document.getElementById("canvas-div").offsetWidth / document.getElementById("canvas-div").offsetHeight) < 1.77) {
        bridge.style["width"] = "100%";
        bridge.style["max-width"] = "1280px";
        bridge.style["height"] = "auto";
    } else {
        bridge.style["height"] = "100%";
        bridge.style["max-height"] = "720px";
        bridge.style["width"] = "auto";
    }
}

current_picture = 1;

if (brushRadius < 50) { brushRadius = 50 }

img.onload = function () {
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
        x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * bridge.width),
        y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * bridge.height)
    };
}

function drawDot(mouseX, mouseY) {
    bridgeCanvas.beginPath();
    bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
    bridgeCanvas.fillStyle = '#000';
    bridgeCanvas.globalCompositeOperation = "destination-out";
    bridgeCanvas.fill();
}

// funzioni di cambio immagine di background e interattiva su canvas

function changeSurroundingImageData(image_number) {
    image_number--;
    document.getElementById("image-title").innerHTML = "<h1>" + image_data[image_number][0] + "</h1>";
    document.getElementById("year").innerHTML = "<h1>" + image_data[image_number][1] + "</h1>";
}

function changeGradientBgColors(image_number) {
    image_number--;
    document.body.style.backgroundImage = 'linear-gradient(-45deg,' + gradientbg_colors[image_number] + ')';
    console.log(document.body.style["background-image"]);
}

function bgImageSwitcherNext() {
    let basic_string = "immagini/";
    loading_screen.style.zIndex = "0";
    if (current_picture < 10) {
        current_picture++;
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function () {
            bridgeCanvas.restore();
            bgimgobj = new Image();
            bgimgobj.onload = function () {
                changeSurroundingImageData(current_picture);
                changeGradientBgColors(current_picture);
                loading_screen.style.zIndex = "-1";
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
        img.onload = function () {
            bridgeCanvas.restore();
            bgimgobj = new Image();
            bgimgobj.onload = function () {
                changeSurroundingImageData(current_picture);
                changeGradientBgColors(current_picture);
                loading_screen.style.zIndex = "-1";
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
    let basic_string = "immagini/";
    loading_screen.style.zIndex = "0";
    if (current_picture > 1) {
        current_picture--;
        new_url_bg = current_picture.toString().concat('\ \(2\).png');
        new_url_top = current_picture.toString().concat('\ \(1\).png');
        img.onload = function () {
            bridgeCanvas.restore();
            bgimgobj.onload = function () {
                changeSurroundingImageData(current_picture);
                changeGradientBgColors(current_picture);
                loading_screen.style.zIndex = "-1";
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
        img.onload = function () {
            bridgeCanvas.restore();
            bgimgobj.onload = function () {
                changeSurroundingImageData(current_picture);
                changeGradientBgColors(current_picture);
                loading_screen.style.zIndex = "-1";
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

bridge.addEventListener("mousemove", function (e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

bridge.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

// altre funzioni

function toggleFullscreen() {
    if (getFullscreenElement()) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen().catch(console.log);
    }
}

function setCanvasWidth() {
    if (window.matchMedia("only screen and (min-width: 1000px)").matches) {
        if ((document.getElementById("canvas-div").offsetWidth / document.getElementById("canvas-div").offsetHeight) < 1.77) {
            bridge.style["width"] = "100%";
            bridge.style["max-width"] = "1280px";
            bridge.style["height"] = "auto";
        } else {
            bridge.style["height"] = "100%";
            bridge.style["max-height"] = "720px";
            bridge.style["width"] = "auto";
        }
    }
}

function playAudio() {
    if (audio.paused) {
        audio_button.innerHTML = '<i class="fa fa-volume-up"></i>';
        audio.currentTime = 0;
        audio.play();
    } else {
        audio_button.innerHTML = '<i class="fa fa-volume-off"></i>';
        audio.pause();
    }
}

// altri listener

avanti.addEventListener("click", bgImageSwitcherNext);

indietro.addEventListener("click", bgImageSwitcherPrevious);

audio_button.addEventListener("click", playAudio)

window.onresize = setCanvasWidth;