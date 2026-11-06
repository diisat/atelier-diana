// Convert browser-observed layout data into editable SVG design boards.
// Input is a local DOM geometry capture, never executable page content.
import fs from 'node:fs';
import path from 'node:path';

const captures = JSON.parse(fs.readFileSync('docs/design/layout-data.json', 'utf8'));
const portrait = fs.readFileSync('frontend/public/images/diana.jpeg').toString('base64');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const number = value => Math.round(value * 100) / 100;
const color = value => {
  if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') return 'none';
  const match = value.match(/^rgba?\(([^)]+)\)/);
  if (!match) return value;
  const values = match[1].split(',').map(Number);
  return `#${values.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join('')}`;
};
const radius = (value, size) => value?.includes('%') ? Number.parseFloat(value) * size / 100 : Number.parseFloat(value) || 0;
let unique = 0;
function roundedPath(item) {
  const {x, y, w, h} = item;
  const r = (item.radii || ['0','0','0','0']).map(v => Math.min(radius(v, w),w/2,h/2));
  return `M${x+r[0]} ${y}H${x+w-r[1]}Q${x+w} ${y} ${x+w} ${y+r[1]}V${y+h-r[2]}Q${x+w} ${y+h} ${x+w-r[2]} ${y+h}H${x+r[3]}Q${x} ${y+h} ${x} ${y+h-r[3]}V${y+r[0]}Q${x} ${y} ${x+r[0]} ${y}Z`;
}
function element(item) {
  if(item.clip) {
    const id=`mask-${unique++}`;
    return `<defs><clipPath id="${id}"><path d="${roundedPath(item.clip)}"/></clipPath></defs><g clip-path="url(#${id})">${element({...item,clip:null})}</g>`;
  }
  const {x,y,w,h}=item;
  if(y<0 || (w && w>2000))return '';
  if(item.type==='text') {
    if(item.text.trim()==='✳') {
      const cx=x+item.size*.4,cy=y+item.size*.5,r=item.size*.31,d=r*.707;
      return `<path d="M${cx-r} ${cy}H${cx+r}M${cx} ${cy-r}V${cy+r}M${cx-d} ${cy-d}L${cx+d} ${cy+d}M${cx-d} ${cy+d}L${cx+d} ${cy-d}" stroke="${color(item.color)}" stroke-width="${Math.max(1,item.size*.025)}" fill="none"/>`;
    }
    let value=item.text.replace(/\s+/g,' ');
    if(item.transform==='uppercase')value=value.toUpperCase();
    const family=item.family.split(',')[0].replaceAll('"','');
    const spacing=item.spacing==='normal'?0:Number.parseFloat(item.spacing);
    return `<text x="${number(x)}" y="${number(y+item.size*.91)}" fill="${color(item.color)}" font-family="${escape(family)}" font-size="${item.size}" font-weight="${item.weight}" font-style="${item.style}" letter-spacing="${spacing}">${escape(value)}</text>`;
  }
  if(item.type==='rect') {
    let result='';const fill=color(item.fill);const stroke=color(item.border);
    const opacity=item.fill?.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/)?.[1]||1;
    if(fill!=='none')result+=`<path d="${roundedPath(item)}" fill="${fill}" opacity="${opacity}"/>`;
    const b=item.borders;
    if(b.every(v=>v===b[0])&&b[0]>0)result+=`<path d="${roundedPath(item)}" fill="none" stroke="${stroke}" stroke-width="${b[0]}"/>`;
    else for(const [index,line] of [`M${x} ${y}H${x+w}`,`M${x+w} ${y}V${y+h}`,`M${x} ${y+h}H${x+w}`,`M${x} ${y}V${y+h}`].entries())if(b[index])result+=`<path d="${line}" stroke="${stroke}" stroke-width="${b[index]}"/>`;
    return result;
  }
  if(item.type==='image') {
    const id=`portrait-${unique++}`;
    const rad=radius(item.ownRadius,w)||radius(item.radius,w);
    const shape=roundedPath({...item,radii:[String(rad),String(rad),'3','3']});
    return `<defs><clipPath id="${id}"><path d="${shape}"/></clipPath></defs><image x="${x}" y="${y}" width="${w}" height="${h}" xlink:href="data:image/jpeg;base64,${portrait}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>`;
  }
  if(item.type==='svg') {
    const viewBox=item.html.match(/viewBox="([^"]+)"/)?.[1]||`0 0 ${w} ${h}`;
    let inner=item.html.slice(item.html.indexOf('>')+1,item.html.lastIndexOf('</svg>'));
    inner=inner.replaceAll('currentColor',color(item.color));
    const root=item.html.slice(0,item.html.indexOf('>'));
    const strokeWidth=root.match(/stroke-width="([^"]+)"/)?.[1]||1.5;
    const stroke=root.match(/stroke="([^"]+)"/)?.[1]?.replace('currentColor',color(item.color))||'none';
    const fill=root.match(/fill="([^"]+)"/)?.[1]?.replace('currentColor',color(item.color))||'none';
    return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${viewBox}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  }
  return '';
}
fs.mkdirSync('docs/design', {recursive:true});
let offset=0;
const boards=[];
for(const [i,screen] of captures.entries()) {
  const content=`<rect width="${screen.width}" height="${screen.height}" fill="#FAF7F2"/>${screen.items.map(element).join('\n')}`;
  const name=`${String(i+1).padStart(2,'0')}-${screen.name.toLowerCase().replace(/[^a-z]+/g,'-')}`;
  const wrapper=(width,height,body)=>`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;
  fs.writeFileSync(path.join('docs/design',`${name}.svg`),wrapper(screen.width,screen.height,content));
  boards.push(`<g id="${name}" transform="translate(${offset},100)"><text y="-28" font-family="DM Sans" font-size="24" fill="#6E263D">${escape(screen.name)} · ${screen.width}px</text>${content}</g>`);
  offset+=screen.width+160;
}
fs.writeFileSync('docs/design/atelier-boards.svg',`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${offset-160}" height="${Math.max(...captures.map(s=>s.height))+100}">${boards.join('\n')}</svg>`);
console.log(`Created ${captures.length} SVG boards and an overview.`);
