import pandas as pd
import csv

# Read dataset 
df = pd.read_csv("new_oil.csv")

years = df['year'].to_list()
bechdel_test_score = df['rating'].to_list()

# Make list of unique years 
set_of_years = set(years)
list_of_unique_years = list(set_of_years)

# Create a list with only years after 1970's
list_of_unique_years_after_70 = []

for i in range(len(list_of_unique_years)):
    if list_of_unique_years[i] > 1970:
        list_of_unique_years_after_70.append(list_of_unique_years[i])

#Check how many movies we're done every unique year
num_of_movies_every_year = [0] * 51
num_of_movies_passed_every_year = [0] * 51

# All movies that was done that year
for val in range(0, len(years)):

    for index in range(0, len(list_of_unique_years_after_70)):

        if years[val] == list_of_unique_years_after_70[index]:
            num_of_movies_every_year[index] += 1

# Movies that passed for every year 
for val in range(0, len(years)):

    for index in range(0, len(list_of_unique_years_after_70)):

        if years[val] == list_of_unique_years_after_70[index] and bechdel_test_score[val] == 3:
            num_of_movies_passed_every_year[index] += 1

# Percentage that passed 
percentage_passed = []
for i in range(0, len(num_of_movies_every_year)):
    percentage_passed.append(round((num_of_movies_passed_every_year[i] / num_of_movies_every_year[i])*100))

#Print year and corresponding percentage
#print(list_of_unique_years_after_70)
#print("")
#print(percentage_passed)

file = open("percentage_passed.csv", "w")
writer = csv.writer(file)

writer.writerow(['years', 'percentage'])

for w in range(len(list_of_unique_years_after_70)):
    writer.writerow([list_of_unique_years_after_70[w], percentage_passed[w]])

file.close()


            
            






