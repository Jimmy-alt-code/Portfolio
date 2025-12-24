import { useEffect, useRef, useMemo } from 'react'; 
import { gsap } from 'gsap'; 

import './ScrollReveal.css'; 

// Only import ScrollTrigger on the client side
let ScrollTrigger;
if (typeof window !== 'undefined') {
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
} 

const ScrollReveal = ({ 
  children, 
  scrollContainerRef, 
  enableBlur = true, 
  baseOpacity = 0.1, 
  baseRotation = 3, 
  blurStrength = 4, 
  containerClassName = '', 
  textClassName = '', 
  rotationEnd = 'bottom bottom', 
  wordAnimationEnd = 'bottom bottom' 
}) => { 
  const containerRef = useRef(null); 

  const splitText = useMemo(() => { 
    const text = typeof children === 'string' ? children : ''; 
    return text.split(/(\s+)/).map((word, index) => { 
      if (word.match(/^\s+$/)) return word; 
      return ( 
        <span className="word" key={index}> 
          {word} 
        </span> 
      ); 
    }); 
  }, [children]); 

  useEffect(() => { 
    // Only run on client side
    if (typeof window === 'undefined' || !ScrollTrigger) return;
    
    const el = containerRef.current; 
    if (!el) return; 

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window; 

    gsap.fromTo( 
      el, 
      { transformOrigin: '0% 50%', rotate: baseRotation }, 
      { 
        ease: 'none', 
        rotate: 0, 
        scrollTrigger: { 
          trigger: el, 
          scroller, 
          start: 'top bottom', 
          end: rotationEnd, 
          scrub: true 
        } 
      } 
    ); 

    const wordElements = el.querySelectorAll('.word'); 

    gsap.fromTo( 
      wordElements, 
      { opacity: baseOpacity, willChange: 'opacity' }, 
      { 
        ease: 'none', 
        opacity: 1, 
        stagger: 0.05, 
        scrollTrigger: { 
          trigger: el, 
          scroller, 
          start: 'top bottom-=20%', 
          end: wordAnimationEnd, 
          scrub: true 
        } 
      } 
    ); 

    if (enableBlur) { 
      gsap.fromTo( 
        wordElements, 
        { filter: `blur(${blurStrength}px)` }, 
        { 
          ease: 'none', 
          filter: 'blur(0px)', 
          stagger: 0.05, 
          scrollTrigger: { 
            trigger: el, 
            scroller, 
            start: 'top bottom-=20%', 
            end: wordAnimationEnd, 
            scrub: true 
          } 
        } 
      ); 
    } 

    return () => { 
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
      }
    }; 
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]); 

  return ( 
    <span ref={containerRef} className={`scroll-reveal ${containerClassName}`}> 
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span> 
    </span> 
  ); 
}; 

export default ScrollReveal;