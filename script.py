i =input("enter the string:")
i=i.lower()
j=i.split(" ")
finalstring ="["
for m in range(0,len(j)):
    
    finalstring=finalstring+"\""+j[m]

    if m!=len(j)-1:
        finalstring=finalstring+" "+"\""+","
    else :
        finalstring=finalstring+"\""+"];"
    
print(finalstring)
