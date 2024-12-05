function LocomotiveJs(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
LocomotiveJs()

// Starting the video after scroll
gsap.to("#section-1 video", {
    scrollTrigger: {
        trigger: `#section-1 video`,
        start: "2% top",
        end: "bottom top",
        // markers: true,
        scroller: "#main"
    },
    onStart: () => {
        document.querySelector("#section-1 video").play();
    }
})

gsap.to("#section-1",{
    scrollTrigger:{
        trigger:`#section-1`,
        start:`5% top`,
        end:`bottom top`,
        scroller:`#main`,
        // markers: true,
        pin:true
    }
})


// gsap.to("#section-1-element",{
//     scrollTrigger:{
//         trigger:`#section-1-element`,
//         start:`5% top`,
//         end:`bottom top`,
//         scroller:`#main`
//     },
//     opacity:0
// })

var timeLine = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-2`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine.to("#section-2>.sect-2-elements", {
    top: "-30%",
})

// CANVAS CODE
function canvas(){
    const canvas = document.querySelector("#section-3>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        ./assets/images/videoframe_1030.png
        ./assets/images/videoframe_1310.png
        ./assets/images/videoframe_1590.png
        ./assets/images/videoframe_1870.png
        ./assets/images/videoframe_2140.png
        ./assets/images/videoframe_2420.png
        ./assets/images/videoframe_2700.png
        ./assets/images/videoframe_2980.png
        ./assets/images/videoframe_3260.png
        ./assets/images/videoframe_3540.png
        ./assets/images/videoframe_3820.png
        ./assets/images/videoframe_4090.png
        ./assets/images/videoframe_4360.png
        `;
        return data.split("\n")[index];
    }

    const frameCount = 14;

    const images = [];
    const imageSeq = {
        frame: 1,                                                                               
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#section-3`,
            start: `top 30%`,
            end: `100% bottom`,
            scroller: `#main`
            // markers: true
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({
    trigger: "#section-3",
    pin: true,
    scroller: `#main`,
    start: `top 0%`,
    end: `100% bottom`,
    });
}
canvas()

var timeLine2 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-4`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine2.to("#section-4>.sect-4-elements", {
    top: "-30%",
})

var timeLine3 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-6`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine3.to("#section-6>.sect-6-elements", {
    top: "-30%",
})

var timeLine4 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-8`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine4.to("#section-8>.sect-8-elements", {
    top: "-30%",
})

var timeLine5 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-10`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine5.to("#section-10>.sect-10-elements", {
    top: "-30%",
})

var timeLine6 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-12`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine6.to("#section-12>.sect-12-elements", {
    top: "-30%",
})

var timeLine7 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-14`,
        start: `top top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        pin: true
    }
})

timeLine7.to("#section-14>.sect-14-elements", {
    top: "-30%",
})


function canvas2() {
    const canvas = document.querySelector("#section-17>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
    });

    function files(index) {
    var data = `
        // paste all images here!!
        ./assets/images/0000.jpg
        ./assets/images/0001.jpg
        ./assets/images/0002.jpg
        ./assets/images/0003.jpg
        ./assets/images/0004.jpg
        ./assets/images/0005.jpg
        ./assets/images/0006.jpg
        ./assets/images/0007.jpg
        ./assets/images/0008.jpg
        ./assets/images/0009.jpg
        ./assets/images/0010.jpg
        ./assets/images/0011.jpg
        ./assets/images/0012.jpg
        ./assets/images/0013.jpg
        ./assets/images/0014.jpg
        ./assets/images/0015.jpg
        ./assets/images/0016.jpg
        ./assets/images/0017.jpg
        ./assets/images/0018.jpg
        ./assets/images/0019.jpg
        ./assets/images/0020.jpg
        ./assets/images/0021.jpg
        ./assets/images/0022.jpg
        ./assets/images/0023.jpg
        ./assets/images/0024.jpg
        ./assets/images/0025.jpg
        ./assets/images/0026.jpg
        ./assets/images/0027.jpg
        ./assets/images/0028.jpg
        ./assets/images/0029.jpg
        ./assets/images/0030.jpg
        ./assets/images/0031.jpg
        ./assets/images/0032.jpg
        ./assets/images/0033.jpg
        ./assets/images/0034.jpg
        ./assets/images/0035.jpg
        ./assets/images/0036.jpg
        ./assets/images/0037.jpg
        ./assets/images/0038.jpg
        ./assets/images/0039.jpg
        ./assets/images/0040.jpg
        ./assets/images/0041.jpg
        ./assets/images/0042.jpg
        ./assets/images/0043.jpg
        ./assets/images/0044.jpg
        ./assets/images/0045.jpg
        ./assets/images/0046.jpg
        ./assets/images/0047.jpg
        ./assets/images/0048.jpg
        ./assets/images/0049.jpg
        ./assets/images/0050.jpg
        ./assets/images/0051.jpg
        ./assets/images/0052.jpg
        ./assets/images/0053.jpg
        ./assets/images/0054.jpg
        ./assets/images/0055.jpg
        ./assets/images/0056.jpg
        ./assets/images/0057.jpg
        ./assets/images/0058.jpg
        ./assets/images/0059.jpg
        ./assets/images/0060.jpg
        ./assets/images/0061.jpg
        ./assets/images/0062.jpg
        ./assets/images/0063.jpg
        ./assets/images/0064.jpg
        ./assets/images/0065.jpg
        ./assets/images/0066.jpg
        ./assets/images/0067.jpg
        ./assets/images/0068.jpg
        ./assets/images/0069.jpg
        ./assets/images/0070.jpg
        ./assets/images/0071.jpg
        ./assets/images/0072.jpg
        ./assets/images/0073.jpg
        ./assets/images/0074.jpg
        ./assets/images/0075.jpg
        ./assets/images/0076.jpg
        ./assets/images/0077.jpg
        ./assets/images/0078.jpg
        ./assets/images/0079.jpg
        ./assets/images/0080.jpg
        ./assets/images/0081.jpg
        ./assets/images/0082.jpg
        ./assets/images/0083.jpg
        ./assets/images/0084.jpg
        ./assets/images/0085.jpg
        ./assets/images/0086.jpg
        ./assets/images/0087.jpg
        ./assets/images/0088.jpg
        ./assets/images/0089.jpg
        ./assets/images/0090.jpg
        ./assets/images/0091.jpg
        ./assets/images/0092.jpg
        ./assets/images/0093.jpg
        ./assets/images/0094.jpg
        ./assets/images/0095.jpg
        ./assets/images/0096.jpg
        ./assets/images/0097.jpg
        ./assets/images/0098.jpg
        ./assets/images/0099.jpg
        ./assets/images/0100.jpg
        ./assets/images/0101.jpg
        ./assets/images/0102.jpg
        ./assets/images/0103.jpg
        ./assets/images/0104.jpg
        ./assets/images/0105.jpg
        ./assets/images/0106.jpg
        ./assets/images/0107.jpg
        ./assets/images/0108.jpg
        ./assets/images/0109.jpg
        ./assets/images/0110.jpg
        ./assets/images/0111.jpg
        ./assets/images/0112.jpg
        ./assets/images/0113.jpg
        ./assets/images/0114.jpg
        ./assets/images/0115.jpg
        ./assets/images/0116.jpg
        ./assets/images/0117.jpg
        ./assets/images/0118.jpg
        ./assets/images/0119.jpg
        ./assets/images/0120.jpg
        ./assets/images/0121.jpg
        ./assets/images/0122.jpg
        ./assets/images/0123.jpg
        ./assets/images/0124.jpg
        ./assets/images/0125.jpg
        ./assets/images/0126.jpg
        ./assets/images/0127.jpg
        ./assets/images/0128.jpg
        ./assets/images/0129.jpg
        ./assets/images/0130.jpg
        ./assets/images/0131.jpg
        ./assets/images/0132.jpg
        ./assets/images/0133.jpg
        ./assets/images/0134.jpg
        ./assets/images/0135.jpg
        ./assets/images/0136.jpg
        ./assets/images/0137.jpg
        ./assets/images/0138.jpg
        ./assets/images/0139.jpg
        ./assets/images/0140.jpg
        ./assets/images/0141.jpg
        ./assets/images/0142.jpg
        ./assets/images/0143.jpg
        ./assets/images/0144.jpg
        ./assets/images/0145.jpg
        ./assets/images/0146.jpg
        ./assets/images/0147.jpg
        ./assets/images/0148.jpg
        ./assets/images/0149.jpg
        ./assets/images/0150.jpg
        ./assets/images/0151.jpg
        ./assets/images/0152.jpg
        ./assets/images/0153.jpg
        ./assets/images/0154.jpg
        ./assets/images/0155.jpg
        ./assets/images/0156.jpg
        ./assets/images/0157.jpg
        ./assets/images/0158.jpg
        ./assets/images/0159.jpg
        ./assets/images/0160.jpg
        ./assets/images/0161.jpg
        ./assets/images/0162.jpg
        ./assets/images/0163.jpg
        ./assets/images/0164.jpg
        ./assets/images/0165.jpg
        ./assets/images/0166.jpg
        ./assets/images/0167.jpg
        ./assets/images/0168.jpg
        ./assets/images/0169.jpg
        ./assets/images/0170.jpg
        ./assets/images/0171.jpg
        ./assets/images/0172.jpg
        ./assets/images/0173.jpg
        ./assets/images/0174.jpg
        ./assets/images/0175.jpg
        ./assets/images/0176.jpg
        ./assets/images/0177.jpg
        ./assets/images/0178.jpg
        ./assets/images/0179.jpg
        ./assets/images/0180.jpg
        ./assets/images/0181.jpg
        ./assets/images/0182.jpg
        ./assets/images/0183.jpg
        ./assets/images/0184.jpg
        ./assets/images/0185.jpg
        ./assets/images/0186.jpg
        ./assets/images/0187.jpg
        ./assets/images/0188.jpg
        ./assets/images/0189.jpg
        ./assets/images/0190.jpg
        ./assets/images/0191.jpg
        ./assets/images/0192.jpg
        ./assets/images/0193.jpg
        ./assets/images/0194.jpg
        ./assets/images/0195.jpg
        ./assets/images/0196.jpg
        ./assets/images/0197.jpg
        ./assets/images/0198.jpg
        ./assets/images/0199.jpg

    `;
    return data.split("\n")[index];
    }

    const frameCount = 200;

    const images = [];
    const imageSeq = {
    frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
    }

    gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
        scrub: 0.15,
        trigger: `#section-17`,
        //   set start end according to preference
        start: `top top`,
        end: `600% top`,
        scroller: `#main`,
    },
    onUpdate: render,
    });

    images[1].onload = render;

    function render() {
    scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
    );
    }
    ScrollTrigger.create({

    trigger: "#section-17>canvas",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    });
}
canvas2();


// The Third Canvas
function canvas3() {
    const canvas = document.querySelector("#section-29>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
    });

    function files(index) {
    var data = `
        // paste all images here!!
        ./assets/images/Vision00001.png
        ./assets/images/Vision00002.png
        ./assets/images/Vision00003.png
        ./assets/images/Vision00004.png
        ./assets/images/Vision00005.png
        ./assets/images/Vision00006.png
        ./assets/images/Vision00007.png
        ./assets/images/Vision00008.png
        ./assets/images/Vision00009.png
        ./assets/images/Vision00010.png
        ./assets/images/Vision00011.png
        ./assets/images/Vision00012.png
        ./assets/images/Vision00013.png
        ./assets/images/Vision00014.png
        ./assets/images/Vision00015.png
        ./assets/images/Vision00016.png
        ./assets/images/Vision00017.png
        ./assets/images/Vision00018.png
        ./assets/images/Vision00019.png
        ./assets/images/Vision00020.png
        ./assets/images/Vision00021.png
        ./assets/images/Vision00022.png
        ./assets/images/Vision00023.png
        ./assets/images/Vision00024.png
        ./assets/images/Vision00025.png
    `;
    return data.split("\n")[index];
    }

    const frameCount = 26;

    const images = [];
    const imageSeq = {
    frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
    }

    gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
        scrub: 0.15,
        trigger: `#section-29`,
        //   set start end according to preference
        start: `top top`,
        end: `80% top`,
        scroller: `#main`,
    },
    onUpdate: render,
    });

    images[1].onload = render;

    function render() {
    scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
    );
    }
    ScrollTrigger.create({

    trigger: "#section-29",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `80% top`,
    });
}
canvas3();

var timeLine8 = gsap.timeline({
    scrollTrigger: {
        trigger: `#section-33`,
        start: `top top`,
        end:`10% top`,
        scrub: 1,
        scroller:`#main`,
        // markers: true,
        // pin: true
    }
})

timeLine8.to("#section-33>#tracking-off", {
    opacity: 0,
})