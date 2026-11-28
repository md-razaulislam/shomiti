/* একতাই আমাদের শক্তি — service worker v4
   Firebase/Google লগইনের পথ আটকায় না; পাতা আগে নেটওয়ার্ক থেকে, না পেলে ক্যাশ থেকে। সাবফোল্ডারেও চলে। */
var V='ek-v4',IDX=self.registration.scope+'index.html';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.indexOf('/__/')>=0)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(V).then(function(ch){ch.put(IDX,c)});return res}).catch(function(){return caches.match(IDX)}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok){var c=res.clone();caches.open(V).then(function(ch){ch.put(r,c)})}return res})}))});
