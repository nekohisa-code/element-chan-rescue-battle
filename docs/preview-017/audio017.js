/* Procedural, locally generated WebAudio tones; book-only cancellation. */
(function(root){'use strict';const Base=root.AudioController;
root.AudioController=class extends Base{
 constructor(){super();this.bookContext=null;this.bookNodes=new Set();this.bookVolume=.16;
  const unlock=()=>this.unlockBook();document.addEventListener('pointerdown',unlock,{capture:true,passive:true});document.addEventListener('keydown',unlock,{capture:true});}
 unlockBook(){try{const Context=root.AudioContext||root.webkitAudioContext;if(!Context)return;
  if(!this.bookContext)this.bookContext=new Context();const ctx=this.bookContext;
  if(ctx.state==='suspended')ctx.resume().then(()=>document.documentElement.dataset.bookAudioState=ctx.state).catch(()=>document.documentElement.dataset.bookAudioState='blocked');
  document.documentElement.dataset.bookAudioState=ctx.state;
 }catch(_){document.documentElement.dataset.bookAudioState='unavailable';}}
 bookTone(kind){if(!this.seEnabled)return;this.unlockBook();const ctx=this.bookContext;if(!ctx||ctx.state!=='running'){document.documentElement.dataset.bookAudioState=ctx?.state||'unavailable';return;}
  const start=ctx.currentTime,duration=kind==='sweep'?.2:.3,osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=kind==='sweep'?'sine':'triangle';
  osc.frequency.setValueAtTime(kind==='sweep'?350:1300,start);osc.frequency.exponentialRampToValueAtTime(kind==='sweep'?1500:2200,start+duration*.65);
  gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(this.bookVolume,start+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
  osc.connect(gain);gain.connect(ctx.destination);this.bookNodes.add(osc);osc.onended=()=>{this.bookNodes.delete(osc);osc.disconnect();gain.disconnect();};osc.start(start);osc.stop(start+duration+.02);
  document.documentElement.dataset.lastBookTone=kind;document.documentElement.dataset.bookAudioState=ctx.state;}
 stopBookTones(){for(const osc of this.bookNodes)try{osc.stop();}catch(_){}this.bookNodes.clear();}
 toggleSe(){const result=super.toggleSe();if(!result)this.stopBookTones();return result;}
};
})(window);
