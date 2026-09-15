"""Import public curriculum metadata from the same immutable snapshot as certificates."""
import json, re
from datetime import datetime
from pathlib import PurePosixPath
from urllib.parse import quote

def section(text, title):
    match = re.search(r"^#{1,4} [^\n]*" + title + r"[^\n]*\n(.*?)(?=^#{1,4} |^---|\Z)", text, re.M|re.S|re.I)
    return match.group(1).strip() if match else ""

def bullets(text):
    return [re.sub(r"\*\*", "", line[2:]).strip() for line in text.splitlines() if line.startswith('- ')]

def completed(text):
    match = re.search(r"\*\*Completion Date:\*\*\s*([^\n]+)", text)
    if not match: return None
    return datetime.strptime(match.group(1).strip(), '%B %d, %Y').date().isoformat()

def build_catalog(commit, files, certificates):
    prefix = 'https://github.com/gijs-hulsebos/Certificates/blob/' + commit + '/'
    url = lambda path: prefix + quote(path, safe='/')
    creds = {str(PurePosixPath(c['path']).parent): c for c in certificates}
    readmes = {str(PurePosixPath(f['path']).parent): f for f in files if f['path'].endswith('/README.md')}
    entries = []
    for folder, f in sorted(readmes.items()):
        if len(PurePosixPath(folder).parts)<2 or folder.endswith('/Misc Certificates'): continue
        text = f['text']; credential = creds.get(folder)
        children = [p for p in readmes if str(PurePosixPath(p).parent)==folder]
        kind = 'program' if children else 'course'
        if PurePosixPath(folder).name.startswith('Module '): kind='module'
        modules=[]
        for m in files:
            if str(PurePosixPath(m['path']).parent)!=folder or not PurePosixPath(m['path']).name.startswith('Module '): continue
            modules.append({'id':m['path'],'title':PurePosixPath(m['path']).stem,'overview':section(m['text'],'Overview'),'topics':bullets(section(m['text'],'Topics')) or [re.sub(r'^[^A-Za-z]*', '', line.replace('*','')) for line in re.findall(r'^#{2,4} (.*(?:Analysis:|Governance|Finance|Economics|Journey|Bias|Transparency).*)$',m['text'],re.M)],'outcomes':bullets(section(m['text'],'Learning Outcomes')),'url':url(m['path'])})
        modules.sort(key=lambda m:int(re.search(r'Module (\d+)',PurePosixPath(m['id']).name).group(1)))
        date=completed(text) if credential else None
        summary=re.search(r'^#{1,4} [^\n]+\n+([^<#\n][^\n]+)',text,re.M)
        entries.append({'id':folder,'title':PurePosixPath(folder).name,'issuer':PurePosixPath(folder).parts[0], 'kind':kind,'parentId':str(PurePosixPath(folder).parent) if str(PurePosixPath(folder).parent) in readmes and len(PurePosixPath(folder).parts)>2 and not str(PurePosixPath(folder).parent).endswith('/Misc Certificates') else None,'status':'completed' if credential else 'in_progress' if 'in progress' in text.lower() else 'documented','completedAt':date,'dateSource':url(f['path']) if date else None,'summary':summary.group(1).strip() if summary else '', 'skills':bullets(section(text,'Skills')),'note':section(text,'Curriculum Note'),'modules':modules,'url':url(f['path']),'credential':credential['credential'] if credential else None})
    return {'schemaVersion':1,'repository':'gijs-hulsebos/Certificates','commit':commit,'entries':entries}

def sync_catalog(root, commit, tree, certificates, fetch):
    files=[]
    for e in tree['tree']:
        if e['type']=='blob' and e['path'].lower().endswith('.md'):
            files.append({'path':e['path'],'text':fetch('https://raw.githubusercontent.com/gijs-hulsebos/Certificates/'+commit+'/'+quote(e['path'],safe='/')).decode('utf-8')})
    result=build_catalog(commit,files,certificates)
    target=root/'public/learning-catalog.json'
    target.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return result
