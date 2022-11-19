import hashlib
import datetime
import json
print(json.__file__)
from flask import Flask,jsonify
import math
import asyncio
import random

class Blockchain:

    def __init__(self):
        self.chain =[]
        self.newData =[]
        self.pendingData =[]
    
    def create_block(self,nonce,prevhash,hash):
        newBlock={
            'index': str(len(self.chain) +1),
            'timestamp': str(datetime.datetime.now()),
            'data': self.pendingData,
            'nonce':str(nonce),
            'hash': hash,
            'prevhash': prevhash
             }
        self.chain.append(newBlock)
        return newBlock

    def print_last_block(self):
        return self.chain[-1]

    def create_new_data(self,id,name,email,password):
        newData={
            'id':id,
            'name': name,
            'email':email,
            'password': password
        }
        print(newData)
        self.pendingData.append(newData)
        return newData

    def hashBlock(self,prevhash,currentBlockData,nonce):
        nonce = random.randint(1,600)
        dataAsString = prevhash + nonce + json.stringify(currentBlockData)
        hash = hashlib.sha256(dataAsString).hexdigest()
        return hash

    

                

        

    
