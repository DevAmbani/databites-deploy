from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from finalmodel import run_model
import download_model

app = Flask(__name__, static_folder='build', static_url_path='')

CORS(app)

# Ensure model is downloaded before the app starts
if not os.path.exists('model.h5'):
    download_model.download_file_from_google_drive('1OLXKhPBj-fiH4hqemOF-BdSYFYXlOPZg', 'backend/model.h5')

# Set up a directory where uploaded files will be stored
UPLOAD_FOLDER = "captured_input"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


IMAGE_FOLDER = 'output_image_list'

# Ensure the upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize global variables
global_pizza_results = []
global_sandwich_results = []


directory_path = os.path.join(os.getcwd(), "output_image_list")


def convert_to_json():
    return


def allowed_file(filename):
    """
    Check if the filename is allowed based on its extension
    """
    allowed_extensions = {"png", "jpg", "jpeg", "gif"}
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


@app.route("/upload", methods=["POST"])
def upload_file():
    global global_pizza_results, global_sandwich_results

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        unique_filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)
        print("filepath:", filepath)

        try:
            file.save(filepath)
            pizza_results, sandwich_results = run_model(filepath)
            # Convert numpy floats to Python floats for JSON serialization
            global_pizza_results = [
                (label, float(score)) for label, score in pizza_results
            ]
            global_sandwich_results = [
                (label, float(score)) for label, score in sandwich_results
            ]
            return jsonify(
                {
                    "message": "File processed successfully",
                    "pizza_results": global_pizza_results,
                    "sandwich_results": global_sandwich_results,
                }
            )
        except Exception as e:
            print(e)  # Log the error for debugging
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file type"}), 400

    #     # Prepare a response
    #     return jsonify({'message': 'File saved successfully', 'filepath': filepath})
    # else:
    #     return jsonify({'error': 'Invalid file type'}), 400


@app.route("/results", methods=["GET"])
def get_results():
    # You would need to implement logic to retrieve and return results here
    return jsonify(
        {
            "pizza_results": global_pizza_results,
            "sandwich_results": global_sandwich_results,
        }
    )


# @app.route("/images/<path:filename>")
# def serve_image(filename):
#     print("Current working directory:", directory_path)
#     return send_from_directory(directory_path, filename)

@app.route("/images/<filename>")
def serve_image(filename):
    """Serve images directly from the output_image_list directory."""
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
