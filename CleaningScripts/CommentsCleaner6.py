import csv, glob, re
print("Start")
converter_table=csv.reader(open("LiteralConvert.csv","rU"))
converterdic={}
for line in converter_table:
    charToFind=line[2]
    charForReplace=line[1]
    print(charToFind+" will be replaced by "+charForReplace)
    converterdic[charToFind] = charForReplace


print(converterdic)

for file in glob.glob("Comments/*.csv"):
        rawfile=csv.reader(open(file,"rU", encoding = "utf-8"))
        print("opening: "+ file)
        new_tablename=file +"converted"
        new_table=csv.writer(open("%s.csv" % (new_tablename),"w"))
        print("created clean file: " + new_tablename)
        for row in rawfile:
            for w in row:
                print(w)
                try:
                    w.translate(converterdic)
                except KeyError:
                    continue
            new_table.writerow(row)
