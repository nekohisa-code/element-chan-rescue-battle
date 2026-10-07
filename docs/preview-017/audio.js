(function (root) {
  "use strict";
  const files={select:"select.wav",deselect:"deselect.wav",success:"success.wav",fail:"fail.wav",discover:"new_discovery.wav",draw:"draw.wav",shuffle:"shuffle.wav",enemyHit:"enemy_hit.wav",playerHit:"player_hit.wav",victory:"victory.wav"};
  class AudioController{
    constructor(){this.bgmEnabled=true;try{const p=JSON.parse(window.PREVIEW_STORAGE017.getItem('element013-bgm'));if(typeof p==='boolean')this.bgmEnabled=p;}catch(_){}this.seEnabled=true;this.started=false;this.lastPlayed=null;this.bgm=new Audio("assets/audio/battle_theme.mp3");this.bgm.loop=true;this.bgm.volume=.2;this.bgm.id="game-bgm";this.bgm.hidden=true;this.bgm.addEventListener("playing",()=>document.documentElement.dataset.bgmState="playing");this.bgm.addEventListener("pause",()=>document.documentElement.dataset.bgmState="paused");document.body.appendChild(this.bgm);this.sounds=Object.fromEntries(Object.entries(files).map(([key,file])=>{const a=new Audio(`assets/audio/${file}`);a.preload="auto";a.volume=.42;return[key,a]}));}
    async startBgm(){this.started=true;if(this.bgmEnabled)try{await this.bgm.play()}catch(_){document.documentElement.dataset.bgmState="blocked"}}
    stopBgm(){this.bgm.pause();this.bgm.currentTime=0}
    toggleBgm(){this.bgmEnabled=!this.bgmEnabled;try{window.PREVIEW_STORAGE017.setItem('element013-bgm',JSON.stringify(this.bgmEnabled));}catch(_){}this.bgmEnabled?this.startBgm():this.bgm.pause();return this.bgmEnabled}
    toggleSe(){this.seEnabled=!this.seEnabled;return this.seEnabled}
    play(name){if(!this.seEnabled||!this.sounds[name])return;this.lastPlayed=name;document.documentElement.dataset.lastSe=name;document.documentElement.dataset.seState="attempted";const a=this.sounds[name].cloneNode();a.volume=this.sounds[name].volume;a.play().then(()=>document.documentElement.dataset.seState="played").catch(()=>document.documentElement.dataset.seState="blocked")}
  }
  root.AudioController=AudioController;if(typeof module!=="undefined"&&module.exports)module.exports={AudioController,files};
}(typeof window!=="undefined"?window:globalThis));
