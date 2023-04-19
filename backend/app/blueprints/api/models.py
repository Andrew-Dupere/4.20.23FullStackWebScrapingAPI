import os
import base64
from app import db
from datetime import datetime


class searchTerm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String(50), nullable=False)
    time = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
        
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()
        
class techTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skills = db.Column(db.String(50), nullable=False)
    counts = db.Column(db.String(50), nullable=False)
    term = db.Column(db.String(50), nullable=False)
    # termForeign = db.Column(db.Integer,db.ForeignKey('search_term.term'))
    #termID = db.column(db.Integer,db.ForeignKey('search_term.id'))

    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

        

    






