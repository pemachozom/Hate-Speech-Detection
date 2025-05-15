from flask import Flask, request, jsonify
import re
import string
import nltk
from nltk.corpus import stopwords
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow import keras
import numpy as np
import pickle
nltk.download("stopwords")
nltk.download("wordnet")
nltk.download("punkt_tab")
app = Flask(__name__)

# Load the saved model and tokenizer
model = keras.models.load_model('gru_model.keras')
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
# Initialize the tokenizer with the OOV token

# Define class labels
actions = ['Not Hate',  'homophobia', 'racism', 'sexism', 'xenophobia']


class_labels = np.array(actions)

# tokenizer.fit_on_texts(X_train)
# word_index = tokenizer.word_index
label_encoder = LabelEncoder()  # Ensure this is fitted properly during training

# Preprocessing function
def preprocess(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text).lower()  # Keep only alphabets
    text = re.sub(r'<[^>]+>', '', text)  # Remove HTML tags
    text = re.sub(r'(function.*?\{.*?\})', '', text, flags=re.DOTALL)  # Remove JavaScript
    text = re.sub(r'\s+', ' ', text).strip()  # Clean up whitespace
    
    punctuationfree = "".join([i for i in text if i not in string.punctuation])  # Remove punctuation
    tokenized = nltk.word_tokenize(punctuationfree)  # Tokenize words
    stop_words = set(stopwords.words('english'))  # Remove stop words
    filtered_words = [word for word in tokenized if word not in stop_words]
    output = " ".join(filtered_words)
    print(type(output))
    return output

# Route to handle prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json()
        print("Received data:", data)
        text_input = data['text']
        print("Text input:", text_input)

        # Preprocess the input text
        new_text_processed = preprocess(text_input)
        print("Processed text:", new_text_processed)

        # Convert the processed text into sequences
        new_sequences = tokenizer.texts_to_sequences([new_text_processed])
        print("Text to sequences:", new_sequences)

        # Pad sequences to ensure they have the same length
        new_padded = pad_sequences(new_sequences, maxlen=100, padding='post', truncating='post')
        print("Padded sequences:", new_padded)

        # Make a prediction using the loaded model
        predictions = model.predict(new_padded)
        predicted_class_index = np.argmax(predictions)

        # Decode the prediction into class labels
        predicted_class_label = class_labels[predicted_class_index]
        return jsonify({'predicted_class': predicted_class_label})
        # predicted_classes = [label_encoder.classes_[i] for i in predictions.argmax(axis=1)]
        # print("Predicted classes:", predicted_classes)

        # Return the predicted class in the response
        # return jsonify({'prediction': predicted_classes[0]})

    except Exception as e:

        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Expose the app on port 5000
