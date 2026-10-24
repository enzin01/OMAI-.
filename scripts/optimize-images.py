"""Recria variantes locais com Pillow. Não é necessário executar na Vercel."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import base64, io, json, re
root=Path(__file__).resolve().parents[1]
assets=root/'public/assets'
manifest={};report=[]
for name in ['digital-foundation-hero','project-commerce','project-saas','project-brand','before','after']:
 source=assets/(name+'.png');im=Image.open(source).convert('RGB')
 widths=[640,960,1440]
 for width in widths:
  dest=assets/f'{name}-{width}.webp'
  im.resize((width,round(width*im.height/im.width)),Image.Resampling.LANCZOS).save(dest,'WEBP',quality=82,method=6)
  report.append({'source':source.name,'output':dest.name,'beforeBytes':source.stat().st_size,'afterBytes':dest.stat().st_size,'width':width})
 manifest['/assets/'+source.name]={'stem':'/assets/'+name,'widths':widths}
for name,size in [('google-review-icon-transparent',(64,64)),('verified-review-icon-transparent',(96,89))]:
 source=assets/(name+'.png');im=Image.open(source).convert('RGBA');im.thumbnail(size,Image.Resampling.LANCZOS)
 dest=assets/(name+'.webp');im.save(dest,'WEBP',lossless=True,method=6)
 report.append({'source':source.name,'output':dest.name,'beforeBytes':source.stat().st_size,'afterBytes':dest.stat().st_size,'width':im.width})
svg=(assets/'omai-logo.svg').read_text();raw=base64.b64decode(re.search(r'data:image/png;base64,([^\"]+)',svg).group(1));logo=Image.open(io.BytesIO(raw)).convert('RGBA')
small=logo.resize((376,376),Image.Resampling.LANCZOS);buf=io.BytesIO();small.save(buf,'PNG',optimize=True);encoded=base64.b64encode(buf.getvalue()).decode()
for path in [assets/'omai-logo.svg',root/'public/favicon.svg',root/'public/apple-touch-icon.svg']:
 old=path.stat().st_size;s=path.read_text();s=re.sub(r'data:image/png;base64,[^\"]+', 'data:image/png;base64,'+encoded,s);path.write_text(s)
 report.append({'source':path.name,'output':path.name,'beforeBytes':old,'afterBytes':path.stat().st_size})
# Mesmo contraste branco do filtro SVG existente, com margem para o ícone Apple.
alpha=ImageOps.invert(ImageOps.grayscale(logo));white=Image.new('RGBA',logo.size,'white');white.putalpha(alpha)
w,h=white.size;white=white.crop((round(w*72/1254),round(h*224/1254),round(w*1184/1254),round(h*968/1254)))
apple=Image.new('RGBA',(180,180),'#0b0b0d');mark=ImageOps.contain(white,(144,108),Image.Resampling.LANCZOS);apple.alpha_composite(mark,((180-mark.width)//2,(180-mark.height)//2));apple.convert('RGB').save(root/'public/apple-touch-icon.png',optimize=True)
font_root=Path('/System/Library/Fonts/Supplemental')
font_file=font_root/'Arial Bold.ttf'
if not font_file.exists():
 candidates=list(Path('/usr/share/fonts').rglob('DejaVuSans-Bold.ttf'));font_file=candidates[0] if candidates else None
if not font_file:raise RuntimeError('Informe uma fonte com suporte a português para gerar os cartões sociais.')
def font(size):return ImageFont.truetype(str(font_file),size)
for file,lines in [('compartilhar-omai',['Sua empresa precisa ser','entendida em segundos.']),('compartilhar-projetos',['Projetos e exemplos de','sites profissionais.'])]:
 image=Image.new('RGB',(1200,630),'#0b0b0d');draw=ImageDraw.Draw(image)
 draw.rectangle((0,0,16,630),fill='#f5c518');draw.rounded_rectangle((930,72,1108,558),radius=30,outline='#f5c518',width=2)
 draw.line((962,150,1075,150),fill='#f5c518',width=4);draw.line((962,190,1040,190),fill='#ffe08a',width=3)
 mark=ImageOps.contain(white,(112,78),Image.Resampling.LANCZOS);image.paste(mark,(72,68),mark)
 draw.text((212,75),'OMAI',font=font(52),fill='#f5c518')
 for i,line in enumerate(lines):draw.text((72,245+i*82),line,font=font(62),fill='#f5f5f7')
 draw.text((76,480),'Criação de sites profissionais',font=font(30),fill='#ffe08a')
 draw.text((76,544),'omai-agencia.vercel.app',font=font(23),fill='#bdbdc7')
 image.save(assets/(file+'.jpg'),'JPEG',quality=88,optimize=True,progressive=True)
(root/'lib/image-assets.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(root/'verification').mkdir(exist_ok=True)
(root/'verification/seo-images.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
