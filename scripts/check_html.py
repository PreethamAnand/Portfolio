import urllib.request

html = urllib.request.urlopen("http://localhost:3008").read().decode("utf-8")
for sec in ["hero", "about", "skills", "work", "certifications", "experience", "achievements", "contact"]:
    print(sec, f'id="{sec}"' in html)
