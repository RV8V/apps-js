import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Input data
data = pd.io.parsers.read_csv('./ratings.dat',
    names=['user_id', 'movie_id', 'rating', 'time'],
    engine='python', delimiter='::')
movie_data = pd.io.parsers.read_csv('./movies.dat',
    names=['movie_id', 'title', 'genre'],
    engine='python', delimiter='::')

# Making matrix
ratings_mat = np.ndarray(
    shape=(np.max(data.movie_id.values), np.max(data.user_id.values)),
    dtype=np.uint8)
ratings_mat[data.movie_id.values-1, data.user_id.values-1] = data.rating.values

# Normalize function and create three new main matrixs
normalised_mat = ratings_mat - np.asarray([(np.mean(ratings_mat, 1))]).T
A = normalised_mat.T / np.sqrt(ratings_mat.shape[0] - 1)
U, S, V = np.linalg.svd(A)

movies_index = movie_data[["title"]].set_index(movie_data.movie_id).reindex(range(3953)).iloc[1:].title
users_index = list(range(1, 6041))

# Calculate inversions
def top_cosine_similarity(data, i, indexes, top_n=10):
    index = i - 1 # Movie/user id starts from 1
    movie_row = data[index, :]
    magnitude = np.sqrt(np.einsum('ij, ij -> i', data, data))
    similarity = np.dot(movie_row, data.T) / (magnitude[index] * magnitude)
    sdata = pd.Series(similarity, index=indexes).sort_values(ascending=False)
    return sdata.iloc[:top_n]

# Recommendation itself
def get_movie_recommendation(movie_id, k=50, top_n=10):
    sliced = V.T[:, :k] # representative data
    results = top_cosine_similarity(sliced, movie_id, movies_index, top_n)
    name = movie_data[movie_data.movie_id == movie_id].title.values[0]
    print(f"Recommendations for movie {name}")
    print(result1)

# Recommendation itself
def get_user_recommendation(user_id, k=50, top_n=10):
    sliced = U[:, :k] # representative data
    results = top_cosine_similarity(sliced, user_id, users_index, top_n)
    print(f"Recommendations for user {user_id}")
    print(results)

#Output data
get_user_recommendation(1)
