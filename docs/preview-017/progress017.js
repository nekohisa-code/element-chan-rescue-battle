(function(root){'use strict';const qa=new URLSearchParams(location.search).has('qa'),key=qa?'element017-qa-tutorial':'element017-tutorial';
let saved={};try{saved=JSON.parse(window.PREVIEW_STORAGE017.getItem(key))||{};}catch(_){}
const state={complete:saved.complete===true,skipped:saved.skipped===true};
function save(){try{window.PREVIEW_STORAGE017.setItem(key,JSON.stringify(state));return true;}catch(_){return false;}}
root.TUTORIAL017={state,save,complete(skipped=false){state.complete=true;state.skipped=skipped;save();},reset(){state.complete=false;state.skipped=false;save();}};
})(window);
