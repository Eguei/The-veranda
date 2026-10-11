/* Plate: sunlight through a breeze-block screen, drifting slowly as the afternoon moves. */
(function(){
  const cv=document.getElementById('wall'); if(!cv) return;
  const ctx=cv.getContext('2d');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W=0,H=0,dpr=1,light=null,grain=null;
  function makeLight(){
    const s=Math.max(64,Math.round(W/5.5));
    const cols=Math.ceil(W*1.8/s)+4, rows=Math.ceil(H*1.6/s)+4;
    const c=document.createElement('canvas'); c.width=cols*s; c.height=rows*s;
    const g=c.getContext('2d'); const f=s*0.12, r=s*0.3, ring=s*0.09;
    g.fillStyle='#ffe9c7';
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++) g.fillRect(x*s+f,y*s+f,s-2*f,s-2*f);
    g.globalCompositeOperation='destination-out'; g.lineWidth=ring; g.strokeStyle='#000';
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){g.beginPath();g.arc(x*s+s/2,y*s+s/2,r,0,Math.PI*2);g.stroke();}
    light=c;
  }
  function makeGrain(){
    const c=document.createElement('canvas'); c.width=c.height=160;
    const g=c.getContext('2d'), d=g.createImageData(160,160);
    for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=16;}
    g.putImageData(d,0,0); grain=c;
  }
  function size(){
    const r=cv.getBoundingClientRect(); dpr=Math.min(2,window.devicePixelRatio||1);
    W=Math.max(1,Math.round(r.width)); H=Math.max(1,Math.round(r.height));
    cv.width=W*dpr; cv.height=H*dpr; makeLight(); draw(performance.now());
  }
  function draw(t){
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const base=ctx.createLinearGradient(0,0,W,H);
    base.addColorStop(0,'#8f7259'); base.addColorStop(1,'#b0927a');
    ctx.fillStyle=base; ctx.fillRect(0,0,W,H);
    const k=reduce?0:Math.sin(t/14000), skew=-0.55+0.12*k;
    ctx.save(); ctx.globalAlpha=.7; ctx.filter='blur('+Math.max(3,W/150)+'px)';
    ctx.setTransform(dpr,0,skew*dpr,0.72*dpr,W*0.18*dpr+(reduce?0:k*W*0.02*dpr),-H*0.05*dpr);
    ctx.drawImage(light,-W*0.4,-H*0.2); ctx.restore();
    const fall=ctx.createRadialGradient(W*0.38,H*0.32,W*0.05,W*0.45,H*0.45,W*0.8);
    fall.addColorStop(0,'rgba(255,214,160,.10)'); fall.addColorStop(1,'rgba(42,30,22,.45)');
    ctx.fillStyle=fall; ctx.fillRect(0,0,W,H);
    const fl=ctx.createLinearGradient(0,H*0.86,0,H);
    fl.addColorStop(0,'rgba(42,30,22,0)'); fl.addColorStop(1,'rgba(42,30,22,.35)');
    ctx.fillStyle=fl; ctx.fillRect(0,H*0.86,W,H*0.14);
    if(grain){ctx.fillStyle=ctx.createPattern(grain,'repeat'); ctx.fillRect(0,0,W,H);}
  }
  function loop(t){draw(t); requestAnimationFrame(loop);}
  makeGrain(); new ResizeObserver(size).observe(cv); size();
  if(!reduce) requestAnimationFrame(loop);
})();
