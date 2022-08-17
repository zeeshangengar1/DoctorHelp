import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
import sys

# Defining the Function
# Input: string containing symptoms separated by commmas
# Output: Generated predictions by models
symptoms=sys.argv[1]
l=len(symptoms)
symptoms=symptoms[:l-1]
DATA_PATH = "Prediction/dataset/Training.csv"
data = pd.read_csv(DATA_PATH).dropna(axis = 1)
X = data.iloc[:,:-1]
symptoms1= X.columns.values
symptom_index = {}
for index, value in enumerate(symptoms1):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index
encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])
data_dict = {
    "symptom_index":symptom_index,
    "predictions_classes":encoder.classes_
}
# creating input data for the models
# symptoms = symptoms.split(",")

input_data = [0] * len(data_dict["symptom_index"])
# print(symptoms)
# print("yes")
symptoms = symptoms.split(",")
# print(len(symptoms))
for symptom in symptoms:
    
    index = data_dict["symptom_index"][symptom]
    # print(index)
    input_data[index] = 1
    
# reshaping the input data and converting it
# into suitable format for model predictions
input_data = np.array(input_data).reshape(1,-1)
final_rf_model=joblib.load('Prediction/rf_model.sav')
final_nb_model=joblib.load('Prediction/nb_model.sav')
final_svm_model=joblib.load('Prediction/svm_model.sav')


# generating individual outputs
rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[0]]
# final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
predictions = {
    "rf_model_prediction": rf_prediction,
    "naive_bayes_prediction": nb_prediction,
    "svm_model_prediction": nb_prediction,
}
s=max(predictions["rf_model_prediction"],predictions["naive_bayes_prediction"],predictions["svm_model_prediction"])
print(s)


# k=predictDisease(sys.argv[1])

# predictDisease(symptoms) 