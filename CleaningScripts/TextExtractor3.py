#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv, glob, re
import os, sys
for file in glob.glob("Comments_UmlauteNoSmiley/*.csv"):
    text_table=csv.reader(open(file,"rU"))
    newName=file[:-9]+"NoSmiley2"
    print(newName)
    print("Start")
    listcomments=[]
    cleaner_table=csv.writer(open("%s.csv" % (newName),"w"))
    for line in text_table:
        line=(line[3][2:-1])
        line=re.sub('\\.{2}', '', line)
        line.replace("\\", "")
        listcomments.append(line)
        cleaner_table.writerow([line])
