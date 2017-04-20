import csv, glob, re
import os, sys
print("Start")


for file in glob.glob("Comments/*.csv"):
    rawfile=csv.reader(open(file,"rU", encoding = "ISO-8859-1"))
    new_tablename=file +"converted"
    new_table=csv.writer(open("%s.csv" % (new_tablename),"w"))
    for row in rawfile:
        for w in row:
            a=str(w)
            b=a.encode('latin-1').decode('utf-8')
            print(b)
        new_table.writerow(row)
