#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv, glob, re
import os, sys
print("Start")
converter_table=csv.reader(open("LiteralConvert.csv","rU"))
converterdic={}
for line in converter_table:
    charToFind=line[2]
    charForReplace=line[1]
    print(charToFind+" will be replaced by "+charForReplace)
    converterdic[charToFind] = charForReplace


print(converterdic)

s="N\xc3\xb6 kein Schnee von gestern doch der beweis daf\xc3\xbcr das L\xc3\xbcgenpresse existiert."
b = s.encode('latin-1').decode('utf-8')

print(b)
