(function(){
  document.querySelectorAll('.vembed').forEach(function(box){
    var v=box.querySelector('video'); if(!v) return;
    var s=v.querySelector('source');
    function soon(){ box.classList.add('soon'); }
    if(s) s.addEventListener('error',soon);
    v.addEventListener('error',soon);
  });
})();
