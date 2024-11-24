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
        markers: true,
        pin: true
    }
})

timeLine.to("#section-2>.sect-2-elements", {
    top: "-30%",
})