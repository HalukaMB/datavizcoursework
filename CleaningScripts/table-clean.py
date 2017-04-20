import re, csv

text_file = open("Output.txt", "w")
b=[]
file_object  = open("Messaround.txt", "r")
for s in file_object:
    print(s)
    a=re.sub('<[^>]+>', ';', s)
    print(a)
    b.append(a)
    text_file.write(a)
text_file.close()
