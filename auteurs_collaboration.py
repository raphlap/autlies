# -*- coding: utf-8 -*-
"""
Created on Mon May 30 14:30:44 2016

@author: BNF0017580
"""

import pandas as pd
from SPARQLWrapper import SPARQLWrapper, JSON
sparql = SPARQLWrapper("http://data.bnf.fr/sparql")
sparql.setReturnFormat(JSON)

DATA = pd.read_csv('C:/Users/raphaelle/Desktop/Divers/auteurs_collaboration/Tableur Corpus total.csv', header = 0, sep = ';', encoding = 'latin')
#DATA = pd.read_csv('U:/auteurs_collaboration/Tableur Corpus total.csv', header = 0, sep = ';')
aut_coll = {}
ix = 0   
for i in DATA['Nom / Pseudonyme'] :
    try :
        aut_coll[ix] = {"nom" : i[0:i.find("(")-1], "prenom" : i[i.find("(")+1:i.find(")")]}
        ix+=1
    except AttributeError,e :
        pass
#for i in range(382):
    #for k,v in aut_coll[i].iteritems() :
        #print v.decode('latin')
        
results_dict = {}
for i in range(1):
    dict_list = []
    sparql.setQuery(""" PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                    PREFIX owl: <http://www.w3.org/2002/07/owl#>
                    PREFIX dc: <http://purl.org/dc/elements/1.1/>
                    PREFIX rdarelationships: <http://rdvocab.info/RDARelationshipsWEMI/>
                    PREFIX dcterms: <http://purl.org/dc/terms/>
                    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                    SELECT DISTINCT ?title ?date ?editeur ?role ?name
                    WHERE
                    {
                    ?auteur foaf:familyName ?nom;
                    foaf:givenName ?prenom.
                    ?express ?p ?auteur;
                    ?contribution ?contributeur.
                    ?contributeur foaf:name ?name.
                    ?contribution skos:prefLabel ?role.
                    ?frbrexpr owl:sameAs ?express.
                    ?manif rdarelationships:expressionManifested ?frbrexpr;
                    dcterms:title ?title;
                    dcterms:date ?date;
                    dcterms:publisher ?editeur.
                    FILTER (regex(?contribution, "bnf"))
                    FILTER (regex(?nom, "%s"))
                    FILTER (regex(?prenom, "%s"))
                    }""" % (aut_coll[75]['nom'],aut_coll[75]['prenom']))
    results = sparql.query().convert()
    for i in range(len(results['results']['bindings'])) :
        little_dict = {}
        little_dict['title'] = results['results']['bindings'][i]['title']['value']
        little_dict['date'] = results['results']['bindings'][i]['date']['value']
        little_dict['editeur'] = results['results']['bindings'][i]['editeur']['value']
        little_dict['role'] = results['results']['bindings'][i]['role']['value']
        little_dict['name'] = results['results']['bindings'][i]['name']['value']
        dict_list.append(little_dict)
    results_dict[i] = dict_list
