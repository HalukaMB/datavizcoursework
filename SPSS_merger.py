import enchant, re, string, glob, csv
spss_table=csv.writer(open("SPSSUKSpellCheck.csv","w"))

for file in glob.glob("Comments_UmlauteNoSmiley/Spellcheck/UK/*.csv"):
    text_table=csv.reader(open(file,"rU"))
    for line in text_table:
        print(file[39:43])
        line.append(file[39:43])
        spss_table.writerow(line)
