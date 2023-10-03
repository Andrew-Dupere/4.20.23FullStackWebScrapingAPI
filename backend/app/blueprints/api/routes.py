
from . import api
from flask import jsonify
from ...scraperScripts.LIscrapeMain import scrapeLI, testFunc

import json

from app.blueprints.api.models import searchTerm, techTable




@api.route('/li/<terms>', methods = ['GET','POST'])
def indexLI(terms):

    result = scrapeLI(terms) 
      
    
    t = {}
    t['term'] = terms 

    searchTerm(**t)

    table = {}
    table['term'] = terms  

    for key, val in result.items():
        table['skills'] = key
        table['counts'] = val
        techTable(**table)        

    return jsonify(result)  


#staticendpoint calling directly from the database
@api.route('/db/<terms>', methods = ['GET','POST'])
def dbCall(terms):    
 
    test = techTable.query.filter_by(term=terms).all()
    
    result = {}

    for t in test:
        result[t.skills] = t.counts
          
    return jsonify(result)
