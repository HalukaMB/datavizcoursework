import enchant, re, string, glob, csv
d = enchant.Dict("en_GB")

for file in glob.glob("Comments_UmlauteNoSmiley/WithoutAll/test/*.csv"):
    text_table=csv.reader(open(file,"rU"))
    newName=file[:-9]+"SpellCheck"
    stats_table=csv.writer(open("%s.csv" % (newName),"w"))
    for line in text_table:
        comment=(line[3][1:])
        exclude = set(string.punctuation)
        comment = ''.join(ch for ch in comment if ch not in exclude)
        stats=[]
        wordcount=0
        mistakes=0
        mistakeratio=0
        for word in comment.split():
            wordcount+=1
            print(word)
            check=(d.check(word))
            if (check==0):
                mistakes+=1
            else:
                continue
        if(wordcount==0):
            mistakeratio=None
        else:
            mistakeratio=(mistakes/wordcount)
        print(wordcount)
        print(mistakes)
        print(mistakeratio)
        stats.append(comment)
        stats.append(wordcount)
        stats.append(mistakes)
        stats.append(mistakeratio)
        stats_table.writerow(stats)
