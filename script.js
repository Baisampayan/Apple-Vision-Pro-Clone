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
            start: `top top`,
            end: `100% top`,
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
    start: `top top`,
    end: `100% top`,
    });
}
canvas()