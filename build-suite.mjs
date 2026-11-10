import { readFileSync, writeFileSync, statSync } from 'fs';

const dir = 'D:/Projects/dapur-sabana/.superpowers/brainstorm/234-1794288734/content';

const h = readFileSync(dir+'/homepage-mockup.html','utf8');
const l = readFileSync(dir+'/layanan-mockup.html','utf8');
const g = readFileSync(dir+'/galeri-kontak-mockup.html','utf8');
const m = readFileSync(dir+'/mobile-mockup.html','utf8');
const wh = readFileSync(dir+'/wireframe-homepage-desktop.html','utf8');
const wl = readFileSync(dir+'/wireframe-layanan-desktop.html','utf8');
const wm = readFileSync(dir+'/wireframe-mobile.html','utf8');
const sg = readFileSync(dir+'/moodboard-styleguide.html','utf8');

const body  = src => { const x=src.match(/<body[^>]*>([\s\S]*)<\/body>/i);  return x?x[1]:''; };
const style = src => { const x=src.match(/<style[^>]*>([\s\S]*?)<\/style>/i); return x?x[1]:''; };

const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dapur Sabana – UI Mockup Suite</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;background:#0f172a;}
#hub{background:#1e293b;border-bottom:3px solid #c8956c;padding:0 24px;display:flex;align-items:center;position:sticky;top:0;z-index:9999;flex-wrap:wrap;}
.brand{font-size:14px;color:#f5e6c8;letter-spacing:1px;font-weight:bold;padding-right:20px;border-right:1px solid #334155;margin-right:8px;}
.brand span{color:#c8956c;}
.hbtn{padding:14px 18px;border:none;background:none;color:#94a3b8;font-size:13px;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-3px;font-family:Arial,sans-serif;transition:all .15s;}
.hbtn:hover{color:#e2e8f0;}
.hbtn.on{color:#c8956c;border-bottom-color:#c8956c;font-weight:bold;}
.page{display:none;}
.page.on{display:block;}
</style>
</head>
<body>
<div id="hub">
  <div class="brand">DAPUR <span>SABANA</span></div>
  <button class="hbtn on" onclick="sw('sg',this)">&#127912; Moodboard & Style Guide</button>
  <button class="hbtn" onclick="sw('wh',this)">&#9634; WF Homepage</button>
  <button class="hbtn" onclick="sw('wl',this)">&#9634; WF Layanan</button>
  <button class="hbtn" onclick="sw('wm',this)">&#9634; WF Mobile</button>
  <button class="hbtn" onclick="sw('home',this)">&#127968; Mockup Homepage</button>
  <button class="hbtn" onclick="sw('layanan',this)">&#128203; Mockup Layanan</button>
  <button class="hbtn" onclick="sw('galeri',this)">&#128444; Mockup Galeri</button>
  <button class="hbtn" onclick="sw('mobile',this)">&#128241; Mockup Mobile</button>
</div>
<div id="sg" class="page on"><style>${style(sg)}</style>${body(sg)}</div>
<div id="wh" class="page"><style>${style(wh)}</style>${body(wh)}</div>
<div id="wl" class="page"><style>${style(wl)}</style>${body(wl)}</div>
<div id="wm" class="page"><style>${style(wm)}</style>${body(wm)}</div>
<div id="home" class="page"><style>${style(h)}</style>${body(h)}</div>
<div id="layanan" class="page"><style>${style(l)}</style>${body(l)}</div>
<div id="galeri" class="page"><style>${style(g)}</style>${body(g)}</div>
<div id="mobile" class="page"><style>${style(m)}</style>${body(m)}</div>
<script>
function sw(id,btn){
  document.querySelectorAll('.page').forEach(d=>d.classList.remove('on'));
  document.querySelectorAll('.hbtn').forEach(b=>b.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  btn.classList.add('on');
  window.scrollTo(0,0);
}
</script>
</body></html>`;

writeFileSync('D:/Projects/dapur-sabana/mockup-suite.html', html, 'utf8');
console.log('done', statSync('D:/Projects/dapur-sabana/mockup-suite.html').size, 'bytes');
