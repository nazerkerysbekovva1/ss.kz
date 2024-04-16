#!/usr/bin/env python
# coding: utf-8
import sys
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import logging

class JobRecommender:
    def __init__(self):
        # Load data and train the model upon initialization
        self.data = self.load_data()
        self.tfidf_matrix, self.similarity = self.train_model()

    def load_data(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        data = pd.read_csv(os.path.join(dir_path, "jobs.csv"))
        if "Unnamed: 0" in data.columns:
            data = data.drop("Unnamed: 0", axis=1)
        return data

    def train_model(self):
        # Assuming `data["Key Skills"]` contains your text data
        feature = self.data["Key Skills"].tolist()
        tfidf = TfidfVectorizer(stop_words="english")
        tfidf_matrix = tfidf.fit_transform(feature)
        similarity = cosine_similarity(tfidf_matrix)
        return tfidf_matrix, similarity

    def jobs_recommendation(self, title):
        # Case insensitive search
        mask = self.data['Job Title'].str.lower() == title.lower()
        if not mask.any():
            logging.warning(f"No job found with title: {title}")
            return json.dumps([])
        
        index = self.data[mask].index[0]
        similarity_scores = list(enumerate(self.similarity[index]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
        similar_jobs_indices = [i[0] for i in similarity_scores[1:6]]  # Get top 5 similar jobs
        return self.data.iloc[similar_jobs_indices].to_json(orient="records")

# Example usage:
if __name__ == "__main__":
    # Create an instance of the JobRecommender class
    recommender = JobRecommender()
    
    # Get the job title from the command-line arguments
    job_title = sys.argv[1]
    
    # Get recommendations for the given job title
    recommendations = recommender.jobs_recommendation(job_title)
    
    # Output recommendations in JSON format
    print(recommendations)

# import sys
# from code import JobRecommender

# # Пример использования сохраненной модели:
# if __name__ == "__main__":
#     # Create an instance of the JobRecommender class
#     recommender = JobRecommender()
    
#     # Load the saved model
#     recommender.load_model()
    
#     # Test the jobs_recommendation function with different job titles
#     # job_title = sys.argv[1]
#     job_title = "SoftWare Developer"
#     print(recommender.jobs_recommendation(job_title))
