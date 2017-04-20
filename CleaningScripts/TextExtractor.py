#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv, glob, re
import os, sys
print("Start")
listcomments=[]
cleaner_table=csv.writer(open("Comments_Umlaute/alternativefuerde_facebook_comments_NoSmiley.csv","w"))
text_table=csv.reader(open("Comments_Umlaute/alternativefuerde_facebook_comments_clean.csv","rU"))
for line in text_table:
    line=(line[3][1:])
    line=re.sub('\\.{2}', '', line)
    print(line)
    listcomments.append(line)
    cleaner_table.writerow([line])
