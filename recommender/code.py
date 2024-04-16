# #!/usr/bin/env python
# # coding: utf-8

# import numpy as np
# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# import matplotlib.pyplot as plt
# from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
# import nltk
# import re
# from nltk.corpus import stopwords
# import string
# import os
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# dir_path = os.path.dirname(os.path.realpath(__file__))
# data = pd.read_csv(os.path.join(dir_path, "jobs.csv"))

# data = data.drop("Unnamed: 0",axis=1)

# feature = data["Key Skills"].tolist()
# tfidf = TfidfVectorizer(stop_words="english")
# tfidf_matrix = tfidf.fit_transform(feature)
# similarity = cosine_similarity(tfidf_matrix)


# indices = pd.Series(data.index, index=data['Job Title']).drop_duplicates()

# def jobs_recommendation(Title, similarity = similarity):
#     index = indices[Title]
#     similarity_scores = list(enumerate(similarity[index]))
#     similarity_scores = sorted(similarity_scores, key=lambda x: x[::], reverse=True)
#     similarity_scores = similarity_scores[0:5]
#     newsindices = [i[0] for i in similarity_scores]
#     return data[['Job Title', 'Job Experience Required', 
#                  'Key Skills']].iloc[newsindices]


# print(jobs_recommendation("Software Developer"))



# coding: utf-8
import sys
import os
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import joblib

class JobRecommender:
    def __init__(self):
        # Load data and train the model upon initialization
        self.data = self.load_data()
        self.load_model()

    def load_data(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        data = pd.read_csv(os.path.join(dir_path, "jobs.csv"))
        data = data.drop("Unnamed: 0", axis=1)
        return data

    def load_model(self):
        # Load the model from the file using joblib
        with open('job_recommender_model.pkl', 'rb') as file:
            self.tfidf_matrix, self.similarity = joblib.load(file)

    def jobs_recommendation(self, title):
        # Get the index of the job title
        index = self.data[self.data['Job Title'] == title].index[0]
        # Get similarity scores for the given job title
        similarity_scores = list(enumerate(self.similarity[index]))
        # Sort the scores in descending order
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
        # Extract the indices of top 5 similar jobs (excluding the same job)
        similar_jobs_indices = [i[0] for i in similarity_scores[1:6]]
        # Return the top 5 similar jobs as a JSON object
        return self.data.iloc[similar_jobs_indices].to_json(orient="records")