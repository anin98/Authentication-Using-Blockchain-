import hashlib
import datetime
import json
print(json.__file__)
from flask import Flask,jsonify
import math
import asyncio
import random

class Blockchain:
    pendingData =[]
    pendingNonce = []
    chain =[]
    newData =[]


    def __init__(self):
        self.chain =[]
        self.newData =[]
        self.pendingData =[]

    def create_block(self,nonce,prevhash,hash):
        newBlock={
            'index': str(len(self.chain) +1),
            'data': self.pendingData,
            'nonce':str(nonce),
            'hash': hash,
            'prevhash': prevhash
             }
        self.chain.append(newBlock)
        return newBlock

    def print_last_block(self):
        return self.chain[-1]

    def create_new_data(self,id,name,email,password,timestamp):
        newData={
            'id':id,
            'name': name,
            'email':email,
            'password': password,
            'timestamp': timestamp
        }
        # print(newData)
        self.pendingData.append(newData)
        return newData

    def hashBlock(self,prevhash,currentBlockData,nonce):
        dataAsString = str(prevhash) + str(nonce) + str(currentBlockData)
        print(dataAsString)
        hash = hashlib.sha256(dataAsString.encode()).hexdigest()
        return hash

    def proofOfWork(self,prevhash,currentBlockData):
        nonce =0;
        hash = self.hashBlock(self,prevhash, currentBlockData, nonce)
        limit = random.randint(0,3)


        def upperbound(num,size):
            num = str(num)
            res = num.zfill(size + len(num))
            return res

        lim = upperbound('',limit)
        while (hash[0:limit]!=lim):
            nonce = nonce+1
            hash = self.hashBlock(self,prevhash, currentBlockData, nonce);

            self.pendingNonce.append(nonce)


        print(nonce)
        return nonce



