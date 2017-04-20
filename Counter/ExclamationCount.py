import enchant, re, string, glob, csv
d = enchant.Dict("en_GB")

for file in glob.glob("Comments_UmlauteNoSmiley/WithoutAll/UK/*.csv"):
    text_table=csv.reader(open(file,"rU"))
    newName=file[:-9]+"exclamation"
    stats_table=csv.writer(open("%s.csv" % (newName),"w"))
    for line in text_table:
        comment=(line[3][1:])
        stats=[]
        wordcount=0
        exclamation=0
        exclamationratio=0
        for word in comment.split():
            wordcount+=1
            print(word)
            numberexcl=(word.count("!"))
            exclamation+=numberexcl
        if(wordcount==0):
            exclamationratio=None
        else:
            exclamationratio=(exclamation/wordcount)
        print(wordcount)
        print(exclamation)
        print(exclamationratio)
        stats.append(comment)
        stats.append(wordcount)
        stats.append(exclamation)
        stats.append(exclamationratio)
        stats_table.writerow(stats)
