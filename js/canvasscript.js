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
const image_data = [["<img src=\"/immagini/greenland.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Scioglimento dei ghiacciai", "2014 - 2016", "64\xB010\u2032N 51\xB045\u2032W"],
["<img src=\"/immagini/china.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Urbanizzazione", "1989 - 2020", "37\xB046\u203248\u2033N 119\xB015\u203200\u2033E"],
["<img src=\"/immagini/italy.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Siccit\u00E0 del fiume Po", "2020 - 2022", "45\xB00\u203258\u2033N 11\xB018\u203222\u2033E"],
["<img src=\"/immagini/paraguay.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Deforestazione", "2017 - 2020", "25\xB017\u203247\u2033S 57\xB038\u203229\u2033W"],
["<img src=\"/immagini/bolivia.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Siccit\u00E0 del lago Poop\u00F2", "2013 - 2016", "18\xB033\u2032S 67\xB005\u2032W"],
["<img src=\"/immagini/australia.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Innalzamento dei mari", "2020 - 2021", "33\xB052\u203204\u2033S 151\xB012\u203226\u2033E"],
["<img src=\"/immagini/democratic-republic-of-congo.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Deforestazione", "1984 - 2020", "4\xB019\u203219\u2033S 15\xB019\u203215\u2033E"],
["<img src=\"/immagini/argentina.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Innalzamento del fiume Paran\u00E1", "2019 - 2020", "20\xB05\u203212\u2033S 51\xB00\u20322\u2033W"],
["<img src=\"/immagini/united-states.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Incendio boschivo in Georgia", "2011 - 2012", "30\xB043\u203248\u2033N 82\xB022\u203208\u2033W"],
["<img src=\"/immagini/antarctica.png\" style=\"width: 26px; height: 26px; margin-right: 10px;\">Collasso dei ghiacciai", "1989 - 2022", "80\xB0S 80\xB0E"]];
const gradientbg_colors = ['#336B8A 0%, #7B9AAC 25%, #C2C7CF 51%, #E2E4E6 100%',
    'rgba(212, 224, 155, 1) 0%, rgba(246, 244, 210, 1) 25%, rgba(203, 223, 189, 1) 51%, rgba(241, 156, 121, 1) 100%',
    'rgba(255, 166, 158, 1) 0%, rgba(250, 243, 221, 1) 25%, rgba(184, 242, 230, 1) 51%, rgba(174, 217, 224, 1) 100%',
    '#D0DB97 0%, #69B578 25%, #3A7D44 51%, #254D32 100%',
    '#A6937E 0%, #496172 25%, #B1A493 51%, #CFC4B4 100%',
    '#F2C57C 0%, #DDAE7E 25%, #7FB685 51%, #426A5A 100%',
    '#DDE5B6 0%, #ADC178 25%, #A98467 51%, #6C584C 100%',
    '#054A91 0%, #3E7CB1 25%, #81A4CD 51%, #DBE4EE 100%',
    '#00838F 0%, #74BEB6 25%, #F28482 51%, #F8AD9D 100%',
    'rgba(241, 250, 238, 1) 0%, rgba(168, 218, 220, 1) 25%, rgba(69, 123, 157, 1) 51%, rgba(29, 53, 87, 1) 100%',
];
const sound_names = ['',
'',
'',
'',
'',
'',
'',
'',
'',
''
]

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
    loading_screen.style.zIndex = -1;
    changeSurroundingImageData(current_picture);
    changeGradientBgColors(current_picture);
    // changeAudio(current_picture);
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
    document.getElementById("image-title").innerHTML = "<h1>" + image_data[image_number][0] + "</h1> <p>" + image_data[image_number][2] + "</p>";
    document.getElementById("year").innerHTML = "<h1>" + image_data[image_number][1] + "</h1>";
}

function changeGradientBgColors(image_number) {
    image_number--;
    document.body.style.backgroundImage = 'linear-gradient(-45deg,' + gradientbg_colors[image_number] + ')';
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
                // changeAudio(current_picture);
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
                // changeAudio(current_picture);
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
            bgimgobj = new Image();
            bgimgobj.onload = function () {
                changeSurroundingImageData(current_picture);
                changeGradientBgColors(current_picture);
                // changeAudio(current_picture);
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
            bgimgobj = new Image();
            bgimgobj.onload = function () {
                changeSurroundingImageData(current_picture);
                changeGradientBgColors(current_picture);
                // changeAudio(current_picture);
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

function changeAudio(image_number) {
    directory_name = "";
    audio.src = directory_name + sound_names[image_number - 1];
}

function setCanvasWidth() {
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