import re
import requests
import bs4
from bs4 import BeautifulSoup
# from lxml import etree
import pandas as pd
import json
# from app.blueprints.api.models import searchTerm



def testFunc(variable):
    d = {variable:234,'JavaScript':25,'SQL':35,'REST API':5,'MongoDB':6}

    
    return d

def scrapeLI(keywords):

    skills = ['NoSQL','SQL','MySQL','Spark','PySpark','CSS','HTML','Bootstrap','Dash','Plotly',' R ',
          'Tableau','Excel','GraphQL','Snowflake','Pytorch','PySpark','PyCharm','ETL','CRUD',
          'Tensorflow','AWS','Flask','Django','API','REST',' Java ','JavaScript','C#','C++','Azure','NLP','Pandas',
          'jQuery','React','Node','Typescript','Python','Linux','Unix','PostgreSQL','MongoDB']
    
    page = range(0,100,25)

    keywordsMod = keywords.replace(' ','%20').replace(',','%2C')

    #create an empty list to store jobID numbers
    jobID = []

    for num in page:
        #this is the url provided when <keywords> is searched in the LinkedIn jobs section. 
        newurl = f'https://www.linkedin.com/jobs/search/?currentJobId=0000000000&f_WT=2&keywords={keywordsMod}&refresh=true&start={num}'
        #make the request from linkedin
        r = requests.get(newurl)
        #parse the request and create first soup
        doc = BeautifulSoup(r.text, "html.parser")
        #find the class containing a job id
        box = doc.find_all('div',class_='base-card relative w-full hover:no-underline focus:no-underline base-card--link base-search-card base-search-card--link job-search-card')
        #use regular expressions to find the text "jobPosting: + 10 numbers" inside the string format of the box
        for match in re.finditer('jobPosting:\d{10}',str(box)):
            #append each job id number to the jobID list after stripping the "jobPosting:" text
            jobID.append(match.group().replace('jobPosting:',''))

        #creat an empty string to store all of the job descriptions

    bigsoup = ''

    for num in jobID:
        #for every jobID in the JobID list, go to the individual job listing page.
        url = f'https://www.linkedin.com/jobs/view/{num}/'
        r = requests.get(url)
        doc = BeautifulSoup(r.text, "html.parser")
        #create the soup and find the description class
        description = str(doc.find_all('div',class_='show-more-less-html__markup show-more-less-html__markup--clamp-after-5'))
        #the bigsoup variable is one massive string containing every job description in the search results. 
        bigsoup += description

    
    result = {}

    for item in skills:
        
        result[item] = bigsoup.count(item)

    return(result)
