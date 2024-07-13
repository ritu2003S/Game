let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_btn = document.getElementsByClassName("stop-btn");
let start_btn = document.getElementById("start-btn");

let sec = 100;
let stopReelFlag = [];
let reelCounts = [];
let slotFrameheight;
let slotReelHeight;
let slotReelitemHeight;
let slotReelStartheight;

let slot = {
    init: function () {
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
        console.log("Slot machine initialized");
    },

    start: function () {
        slot.init();
        for (let index = 0; index < 3; index++) {
            slot.animation(index);
        }
    },

    stop: function (i) {
        stopReelFlag[i] = true;
        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
            start_btn.removeAttribute("disabled");
        }
    },

    resetLocationInfo: function () {
        slotFrameheight = slot_screen.offsetHeight;
        slotReelHeight = reels[0].offsetHeight;
        slotReelitemHeight = reel[0].offsetHeight;
        slotReelStartheight = -slotReelHeight + slotFrameheight;
        slotReelStartheight = -(slotFrameheight / 2) + slotReelitemHeight * 3 / 2;
        for (let i = 0; i < reels.length; i++) {
            reels[i].style.top = String(slotReelStartheight) + "px";
        }
        console.log("Location info reset");
    },

    animation: function (index) {
        if (reelCounts[index] >= 8) {
            reelCounts[index] = 0;
        }
        $(".reels").eq(index).animate({
            "top": slotReelStartheight + (reelCounts[index] * slotReelitemHeight)
        },
        {
            duration: sec,
            easing: "linear",
            complete: function () {
                if (stopReelFlag[index]) {
                    return;
                }
                reelCounts[index]++;
                slot.animation(index);
            }
        });
    },

    loadImages: function () {
        let folders = ['bottom', 'top', 'boots'];
        for (let i = 0; i < 3; i++) {
            slot.loadImagesFromFolder(folders[i], reels[i]);
        }
        slot.resetLocationInfo();
    },

    loadImagesFromFolder: function (folder, reel) {
        let images = []; // Replace with logic to fetch images from the folder.
        for (let i = 1; i <= 10; i++) {
            images.push(`${folder}/${i}.jpg`); 
        }
        images.forEach((src) => {
            let img = document.createElement('img');
            img.src = src;
            reel.appendChild(img);
        });
    }
};

window.onload = function () {
    slot.init();
    slot.resetLocationInfo();
    start_btn.addEventListener("click", function (e) {
        e.target.setAttribute("disabled", true);
        slot.start();
        for (let i = 0; i < stop_btn.length; i++) {
            stop_btn[i].removeAttribute("disabled");
        }
    });
    for (let i = 0; i < stop_btn.length; i++) {
        stop_btn[i].addEventListener("click", function (e) {
            slot.stop(e.target.getAttribute("data-val"));
        });
    }
    console.log("Window loaded, event listeners added");
};
