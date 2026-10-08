(function(){'use strict';
// Keep secondary controls accessible without covering the portrait ensemble.
const title=document.getElementById('title-screen'),options=document.createElement('details');
options.className='title-options017';options.innerHTML='<summary>設定・ゲームのルール</summary><div class="title-options-content017"></div>';
const content=options.lastElementChild;
for(const selector of ['.reset-links','.science']){const node=title.querySelector(selector);if(node)content.append(node);}
title.append(options);
const portrait=matchMedia('(max-width:700px) and (orientation:portrait)'),replay=title.querySelector('.tutorial-replay017'),start=document.getElementById('start-button');
function placeReplay(){if(!replay)return;if(portrait.matches)content.append(replay);else title.insertBefore(replay,start);}
placeReplay();
if(portrait.addEventListener)portrait.addEventListener('change',placeReplay);else portrait.addListener(placeReplay);
})();
