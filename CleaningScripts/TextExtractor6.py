#!/usr/bin/env python
# -*- coding: latin-1 -*-
import re
line='Alexander Gon\xc3\xa7alves da Silva Gerade im Falle des "Grexit" teile ich Ihre Einstellung, was auch die Einstellung des IFO Institutes ist. Hier kann nur eine Währungsabwertung helfen. Dennoch muss auch unser Lohndumping gestoppt werden.'
print(line)

line= ''.join(c for c in line if c <= '\uFFFF')
print(line)
line=re.sub('\\.{3}', '', line)
