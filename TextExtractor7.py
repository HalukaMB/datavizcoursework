import csv, glob, re
for file in glob.glob("Comments/*.csv"):
    rawfile=csv.reader(open(file,"rU", encoding = "utf-8"))
    new_tablename=file +"convertedNEW"
    new_table=csv.writer(open("%s.csv" % (new_tablename),"w"))
    for row in rawfile:
        for w in row:
            print(w.encode('byte').decode('utf-8'))

        new_table.writerow(row)
