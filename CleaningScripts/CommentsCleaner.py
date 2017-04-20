import csv, glob, re
print("Start")
converter_table=csv.reader(open("LiteralConvert.csv","rU", encoding = "ISO-8859-1"))

for file in glob.glob("Comments/*.csv"):
    rawfile=csv.reader(open(file,"rU", encoding = "ISO-8859-1"))
    print("opening: "+ file)
    new_tablename=file +"converted"
    new_table=csv.writer(open("%s.csv" % (new_tablename),"w"))
    print("created clean file: " + new_tablename)
    for row in rawfile:
        print(row)
        for line in converter_table:
            #print(line)
            charToFind=line[2]
            charForReplace=line[1]
            print(charToFind+" will be replaced by "+charForReplace)
            for w in row:
                re.sub(r'#big(?=[.,\s]|$)', r'#BIG', w)
            #re.sub(r"%s" % (charToFind), r"%s" % (charForReplace), row)
            new_table.writerow(row)
